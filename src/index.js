//KNN
// TODO: export { default as KNNImageClassifier } from "./models/KNNImageClassifier.svelte";

// Image classification
export { default as ImageClassifier } from "./models/ImageClassifier.svelte";
export { default as ObjectDetection } from "./models/ObjectDetection.svelte";

// Audio
export { default as SpeechCommandRecognition } from "./models/SpeechCommandRecognition.svelte";

// Text
export { default as SentenceEncoding } from "./models/SentenceEncoding.svelte";
export { default as TextToxicity } from "./models/TextToxicity.svelte";

// Pose Estimation
export { default as MultiPoseEstimator } from "./models/MultiPoseEstimator.svelte";

// Body Segmentation
export { default as BokehEffect } from "./models/segmentation/BokehEffect.svelte";
export { default as BlurBodyParts } from "./models/segmentation/BlurBodyParts.svelte";
export { default as BodySegmentation } from "./models/segmentation/BodySegmentation.svelte";
export { default as HandPoseDetection } from "./models/segmentation/HandPoseDetection.svelte";
export { default as FaceMesh } from "./models/segmentation/FaceMesh.svelte";
