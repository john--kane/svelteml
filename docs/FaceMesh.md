# Face Mesh

## Sample Usage

    <script>
      import { FaceMesh } from 'svelteml'
      import { onMount } from 'svelte'

      let captureImage // reactive image for passing to estimator
      let outputCanvas // to display results of the poses

      onMount(async () => {
        // TODO: get image, video or canvas source and add it to captureImage
      })

      function onMeshesReceived(meshes) {
        console.log(meshes);
      }
    </script>

    {#if captureImage}
        <FaceMesh image={captureImage} outputCanvas={outputCanvas} maxFaces={1} on:meshesReceived={onMeshesReceived}/>
    {/if}

## API

| Parameter          | Type                                                               | Description                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **renderToCanvas** | _boolean_                                                          | If set to false, will not render on the provided canvas. Use the meshesReceived event to trigger custom logic in your component.Defaults to true |
| **maxFaces**       | _number_                                                           | The maximum number of faces detected in the input. Should be set to the minimum number for performance. Defaults to 1.                           |
| **image**          | _ImageData, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement_ | The element that houses the image to be processed                                                                                                |

## Events

| Parameter             | Type    | Parameters                                    |
| --------------------- | ------- | --------------------------------------------- |
| **on:meshesReceived** | _event_ | The estimated meshes outputted from the model |
