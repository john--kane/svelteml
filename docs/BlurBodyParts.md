# Blur Body Parts

![](_media/blurred.jpg)

## Sample Usage

    <script>
      import { BlurBodyParts } from 'svelteml'
      import { onMount } from 'svelte'

      let captureImage // reactive image for passing to estimator
      let outputCanvas // to display results of the poses

      onMount(async () => {
        // TODO: get image, video or canvas source and add it to captureImage
      })

      function onBlurComplete(partSegmentations) {
        console.log(partSegmentation);
      }
    </script>

    {#if captureImage}
        <!-- if you don't use the debug prop then no need for this if condition, just saves on calls -->
        <BlurBodyParts  image={captureImage}  outputCanvas={outputCanvas} on:complete={onBlurComplete} />
    {/if}

## API

| Parameter                 | Type                                                               | Description                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **backgroundBlurAmount**  | _number_                                                           | How many pixels in the background blend into each other. Defaults to 3. Should be an integer between 1 and 20                       |
| **edgeBlurAmount**        | _number_                                                           | How many pixels to blur on the edge between the person and the background by. Defaults to 3. Should be an integer between 0 and 20. |
| **flipHorizontal**        | _boolean_                                                          | If the output should be flipped horizontally. Defaults to false.                                                                    |
| **faceBodyPartIdsToBlur** | _array of body part enum_                                          | Default to [0, 1] (left-face and right-face). An array of body part ids to blur. Each must be one of the 24 body part ids.          |
| **outputCanvas**          | _HTMLCanvasElement_                                                | The HTML Canvas where the end effect will be rendered                                                                               |
| **image**                 | _ImageData, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement_ | The element that houses the image to be processed                                                                                   |

## Events

| Parameter           | Type    | Parameters                                                                                             |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| **on:segmentation** | _event_ | Segmentation object with the output from Body Pix's segmentMultiPersonParts method.                    |
| **on:complete**     | _event_ | This is triggered only when the segmentation and the bokeh effect has been applied to the outputCanvas |

## Body Parts Index

| Ordinal | Body Part             |
| ------- | --------------------- |
| 0       | left_face             |
| 1       | right_face            |
| 2       | left_upper_arm_front  |
| 3       | left_upper_arm_back   |
| 4       | right_upper_arm_front |
| 5       | right_upper_arm_back  |
| 6       | left_lower_arm_front  |
| 7       | left_lower_arm_back   |
| 8       | right_lower_arm_front |
| 9       | right_lower_arm_back  |
| 10      | left_hand             |
| 11      | right_hand            |
| 12      | torso_front           |
| 13      | torso_back            |
| 14      | left_upper_leg_front  |
| 15      | left_upper_leg_back   |
| 16      | right_upper_leg_front |
| 17      | right_upper_leg_back  |
| 18      | left_lower_leg_front  |
| 19      | left_lower_leg_back   |
| 20      | right_lower_leg_front |
| 21      | right_lower_leg_back  |
| 22      | left_feet             |
| 23      | right_feet            |
