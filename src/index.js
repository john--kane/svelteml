//KNN
// TODO: export { default as KNNImageClassifier } from "./models/KNNImageClassifier.svelte";

// Image classification
export { default as ImageClassifier } from './models/classifications/ImageClassifier.svelte'
export { default as ObjectDetection } from './models/classifications/ObjectDetection.svelte'
export {
  default as MultiPoseEstimator,
  getBoundingBox,
  getAdjacentKeyPoints,
  minPoseConfidence,
  minPartConfidence,
} from './models/classifications/MultiPoseEstimator.svelte'

// Audio
// TODO: export { default as SpeechCommandRecognition } from "./models/audio/SpeechCommandRecognition.svelte";

// Text
export { default as SentenceEncoding } from './models/text/SentenceEncoding.svelte'
export { default as TextToxicity } from './models/text/TextToxicity.svelte'
export { default as QnA } from './models/text/QnA.svelte'

// Body Segmentation
export { default as BokehEffect } from './models/segmentation/BokehEffect.svelte'
export {
  default as BlurBodyParts,
  BodyParts,
} from './models/segmentation/BlurBodyParts.svelte'
export {
  default as BodySegmentation,
  drawMaskOnCanvas,
} from './models/segmentation/BodySegmentation.svelte'
export {
  default as HandPoseDetection,
  // FingerLookupIndices,
  drawHandKeypoints,
} from './models/segmentation/HandPoseDetection.svelte'
export {
  default as FaceMesh,
  drawFaceMeshOnCanvas,
} from './models/segmentation/FaceMesh.svelte'

// General

export { default as AutoMLObjectDetect } from './models/automl/AutoMLObjectDetect.svelte'
export { default as AutoMLImageClassifier } from './models/automl/AutoMLImageClassifier.svelte'

export { drawBoundingBox, drawKeypoints, drawSkeleton } from './utils/PoseUtils'
