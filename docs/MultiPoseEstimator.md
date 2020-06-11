# Multi Pose Estimation

This element can take in an image and calculate the poses of multiple people within it. It can render out debug information onto a canvas element you pass in but you can also just pass in the image and it will return a poses event to describe the points estimated.

## Example Snippet

    <script>
      //Only uses the MobileNet architecture currently
      import { MultiPoseEstimator } from 'svelteml';

      let camRef // input: TODO: get image, video or canvas source

      // optional, can get complicated but there are convenience methods in the module export, to draw a skeleton or the keypoints
      function onPoses(poses) {
        console.log(poses);
      }
    </script>

    <MultiPoseEstimator image="{camRef}" on:poses="{onPoses}" />

\* **image** is required \* **on:poses={eventFunction}** is required

\* Throws an error:debug event if the debugCanvas is not an instance of HTMLCanvasElement

## API

| Parameter          | Type                | Description                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **image**          | _HTMLCanvasElement_ | The image resource to estimate (e.g. frame of a video)                                                                                                                                                                                                                                                             |
| **flipHorizontal** | _boolean_           | \*_optional_ Defaults to false. If the pose should be flipped/mirrored horizontally [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                                                                 |
| **maxDetections**  | _number_            | \*_optional_ the maximum number of poses to detect. Defaults to 5. [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                                                                                  |
| **scoreThreshold** | _number_            | \*_optional_ Only return instance detections that have root part score greater or equal to this value. Defaults to 0.5. [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                             |
| **nmsRadius**      | _number_            | \*_optional_ Non-maximum suppression part distance. It needs to be strictly positive. Two parts suppress each other if they are less than `nmsRadius` pixels away. Defaults to 30.0 [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) |

## Events

| Parameter                | Type               | Description                                                                               |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------------- |
| **on:poses**             | _array of objects_ | The raw array of poses prediction made by the model                                       |
| **on:modelLoadStarted**  | _event_            | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_            | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |

## Module Exports

| Parameter                | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| **getBoundingBox**       | Draws a bounding box around the posers found                                  |
| **getAdjacentKeyPoints** | Convenience method for getting the adjeacent keypoints returned in the poses. |

# Deprecated

| Parameter             | Type     | Description                                     |
| --------------------- | -------- | ----------------------------------------------- |
| **minPoseConfidence** | _number_ | Can be passed directly to the convience methods |
| **minPartConfidence** | _number_ | Can be passed directly to the convience methods |
