# Hand Pose Detection

## Sample Usage

    <script>
      import { HandPoseDetection } from 'svelteml'
      import { onMount } from 'svelte'

      let captureImage // reactive image for passing to estimator
      let outputCanvas // to display results of the poses

      onMount(async () => {
        // TODO: get image, video or canvas source and add it to captureImage
      })

      function onPredictions(predictions) {
        console.log(predictions);
      }
    </script>

    {#if captureImage}
    <HandPoseDetection image={captureImage} on:predict={onPredictions}/>
    {/if}

## API

| Parameter | Type                                                               | Description                                                                               |
| --------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **image** | _ImageData, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement_ | The element that houses the image to be processed. Poses will be rendered on top of image |

## Events

| Parameter      | Type    | Parameters                                   |
| -------------- | ------- | -------------------------------------------- |
| **on:predict** | _event_ | The raw predictions outputted from the model |
