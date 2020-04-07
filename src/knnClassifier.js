import * as tf from "@tensorflow/tfjs-core";
import { util } from "@tensorflow/tfjs-core";
import { concatWithNulls, topK } from "./util";
export { version } from "./version";
/**
 * A K-nearest neighbors (KNN) classifier that allows fast
 * custom model training on top of any tensor input. Useful for transfer
 * learning with an embedding from another pretrained model.
 */
export class KNNClassifier {
  constructor() {
    // Individual class datasets used when adding examples. These get concatenated
    // into the full trainDatasetMatrix when a prediction is made.
    this.classDatasetMatrices = {};
    this.classExampleCount = {};
    this.labelToClassId = {};
    this.nextClassId = 0;
  }
  /**
   * Adds the provided example to the specified class.
   */
  addExample(example, label) {
    if (this.exampleShape == null) {
      this.exampleShape = example.shape;
    }
    if (!util.arraysEqual(this.exampleShape, example.shape)) {
      throw new Error(
        `Example shape provided, ${example.shape} does not match ` +
          `previously provided example shapes ${this.exampleShape}.`
      );
    }
    this.clearTrainDatasetMatrix();
    if (!(label in this.labelToClassId)) {
      this.labelToClassId[label] = this.nextClassId++;
    }
    tf.tidy(() => {
      const normalizedExample = this.normalizeVectorToUnitLength(
        example.flatten()
      );
      const exampleSize = normalizedExample.shape[0];
      if (this.classDatasetMatrices[label] == null) {
        this.classDatasetMatrices[label] = normalizedExample.as2D(
          1,
          exampleSize
        );
      } else {
        const newTrainLogitsMatrix = this.classDatasetMatrices[label]
          .as2D(this.classExampleCount[label], exampleSize)
          .concat(normalizedExample.as2D(1, exampleSize), 0);
        this.classDatasetMatrices[label].dispose();
        this.classDatasetMatrices[label] = newTrainLogitsMatrix;
      }
      tf.keep(this.classDatasetMatrices[label]);
      if (this.classExampleCount[label] == null) {
        this.classExampleCount[label] = 0;
      }
      this.classExampleCount[label]++;
    });
  }
  /**
   * This method return distances between the input and all examples in the
   * dataset.
   *
   * @param input The input example.
   * @returns cosine similarities for each entry in the database.
   */
  similarities(input) {
    return tf.tidy(() => {
      const normalizedExample = this.normalizeVectorToUnitLength(
        input.flatten()
      );
      const exampleSize = normalizedExample.shape[0];
      // Lazily create the logits matrix for all training examples if necessary.
      if (this.trainDatasetMatrix == null) {
        let newTrainLogitsMatrix = null;
        for (const label in this.classDatasetMatrices) {
          newTrainLogitsMatrix = concatWithNulls(
            newTrainLogitsMatrix,
            this.classDatasetMatrices[label]
          );
        }
        this.trainDatasetMatrix = newTrainLogitsMatrix;
      }
      if (this.trainDatasetMatrix == null) {
        console.warn("Cannot predict without providing training examples.");
        return null;
      }
      tf.keep(this.trainDatasetMatrix);
      const numExamples = this.getNumExamples();
      return this.trainDatasetMatrix
        .as2D(numExamples, exampleSize)
        .matMul(normalizedExample.as2D(exampleSize, 1))
        .as1D();
    });
  }
  /**
   * Predicts the class of the provided input using KNN from the previously-
   * added inputs and their classes.
   *
   * @param input The input to predict the class for.
   * @returns A dict of the top class for the input and an array of confidence
   * values for all possible classes.
   */
  async predictClass(input, k = 3) {
    if (k < 1) {
      throw new Error(
        `Please provide a positive integer k value to predictClass.`
      );
    }
    if (this.getNumExamples() === 0) {
      throw new Error(
        `You have not added any examples to the KNN classifier. ` +
          `Please add examples before calling predictClass.`
      );
    }
    const knn = tf.tidy(() => this.similarities(input).asType("float32"));
    const kVal = Math.min(k, this.getNumExamples());
    const topKIndices = topK(await knn.data(), kVal).indices;
    knn.dispose();
    return this.calculateTopClass(topKIndices, kVal);
  }
  /**
   * Clears the saved examples from the specified class.
   */
  clearClass(label) {
    if (this.classDatasetMatrices[label] == null) {
      throw new Error(`Cannot clear invalid class ${label}`);
    }
    this.classDatasetMatrices[label].dispose();
    delete this.classDatasetMatrices[label];
    delete this.classExampleCount[label];
    this.clearTrainDatasetMatrix();
  }
  clearAllClasses() {
    for (const label in this.classDatasetMatrices) {
      this.clearClass(label);
    }
  }
  getClassExampleCount() {
    return this.classExampleCount;
  }
  getClassifierDataset() {
    return this.classDatasetMatrices;
  }
  getNumClasses() {
    return Object.keys(this.classExampleCount).length;
  }
  setClassifierDataset(classDatasetMatrices) {
    this.clearTrainDatasetMatrix();
    this.classDatasetMatrices = classDatasetMatrices;
    for (const label in classDatasetMatrices) {
      this.classExampleCount[label] = classDatasetMatrices[label].shape[0];
    }
  }
  /**
   * Calculates the top class in knn prediction
   * @param topKIndices The indices of closest K values.
   * @param kVal The value of k for the k-nearest neighbors algorithm.
   */
  calculateTopClass(topKIndices, kVal) {
    let topLabel;
    const confidences = {};
    if (topKIndices == null) {
      // No class predicted
      return {
        classIndex: this.labelToClassId[topLabel],
        label: topLabel,
        confidences,
      };
    }
    const classOffsets = {};
    let offset = 0;
    for (const label in this.classDatasetMatrices) {
      offset += this.classExampleCount[label];
      classOffsets[label] = offset;
    }
    const votesPerClass = {};
    for (const label in this.classDatasetMatrices) {
      votesPerClass[label] = 0;
    }
    for (let i = 0; i < topKIndices.length; i++) {
      const index = topKIndices[i];
      for (const label in this.classDatasetMatrices) {
        if (index < classOffsets[label]) {
          votesPerClass[label]++;
          break;
        }
      }
    }
    // Compute confidences.
    let topConfidence = 0;
    for (const label in this.classDatasetMatrices) {
      const probability = votesPerClass[label] / kVal;
      if (probability > topConfidence) {
        topConfidence = probability;
        topLabel = label;
      }
      confidences[label] = probability;
    }
    return {
      classIndex: this.labelToClassId[topLabel],
      label: topLabel,
      confidences,
    };
  }
  /**
   * Clear the lazily-loaded train logits matrix due to a change in
   * training data.
   */
  clearTrainDatasetMatrix() {
    if (this.trainDatasetMatrix != null) {
      this.trainDatasetMatrix.dispose();
      this.trainDatasetMatrix = null;
    }
  }
  /**
   * Normalize the provided vector to unit length.
   */
  normalizeVectorToUnitLength(vec) {
    return tf.tidy(() => {
      const sqrtSum = vec.norm();
      return tf.div(vec, sqrtSum);
    });
  }
  getNumExamples() {
    let total = 0;
    for (const label in this.classDatasetMatrices) {
      total += this.classExampleCount[label];
    }
    return total;
  }
  dispose() {
    this.clearTrainDatasetMatrix();
    for (const label in this.classDatasetMatrices) {
      this.classDatasetMatrices[label].dispose();
    }
  }
}

export function create() {
  return new KNNClassifier();
}
