# Multi Pose Estimation

This element can take in an image and calculate the poses of multiple people within it. It can render out debug information onto a canvas element you pass in but you can also just pass in the image and it will return a poses event to describe the points estimated.

## Example Snippet

    <script>
      //Only uses the MobileNet architecture currently
      import { MultiPoseEstimator } from 'svelteml'
      import { onMount } from 'svelte'

      let captureImage // reactive image for passing to estimator
      let outputCanvas // to display results of the poses

      onMount(async () => {
        // TODO: get image, video or canvas source and add it to captureImage
      })

      function onPoses(poses) {
        console.log(poses);
      }
    </script>

    {#if captureImage}
        <!-- if you don't use the debug prop then no need for this if condition, just saves on calls -->
        <BlurBodyParts  image={captureImage}  outputCanvas={outputCanvas} on:complete={onBlurComplete} />
    {/if}
     <MultiPoseEstimator
         image={captureImage}
         on:poses={onPoses}
         />

\* **image** is required \* **on:poses={eventFunction}** is required

\* Throws an error:debug event if the debugCanvas is not an instance of HTMLCanvasElement

## API

| Parameter             | Type                | Description                                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **image**             | _HTMLCanvasElement_ | The image resource to estimate (e.g. frame of a video)                                                                                                                                                                                                                                                             |
| **debugCanvas**       | _HTMLCanvasElement_ | \*_optional_ allows you to see what pose was calculated. The points will be rendered on top of whatever canvas you send in.                                                                                                                                                                                        |
| **flipHorizontal**    | _boolean_           | \*_optional_ Defaults to false. If the pose should be flipped/mirrored horizontally [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                                                                 |
| **maxDetections**     | _number_            | \*_optional_ the maximum number of poses to detect. Defaults to 5. [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                                                                                  |
| **scoreThreshold**    | _number_            | \*_optional_ Only return instance detections that have root part score greater or equal to this value. Defaults to 0.5. [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                             |
| **minPoseConfidence** | _number_            | \*_optional_ Tolerance for pose confidence, only used in debugCanvas rendering                                                                                                                                                                                                                                     |
| **minPartConfidence** | _number_            | \*_optional_ Tolerance for part confidence, only used in debugCanvas rendering [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)                                                                                                      |
| **nmsRadius**         | _number_            | \*_optional_ Non-maximum suppression part distance. It needs to be strictly positive. Two parts suppress each other if they are less than `nmsRadius` pixels away. Defaults to 30.0 [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) |

## Events

| Parameter       | Type               | Description                                            |
| --------------- | ------------------ | ------------------------------------------------------ |
| **on:poses**    | _array of objects_ | The raw array of poses prediction made by the model    |
| **error:debug** | _array of objects_ | Triggered when the debugCanvas is not a Canvas element |
