# Face Mesh

## Sample Usage

    <script>
      import { FaceMesh, drawFaceMeshOnCanvas } from 'svelteml';

      let camRef // input: TODO: get image, video or canvas source
      let testCanvas // output: TODO: bind a canvas if you want to output the effect of the blur to the screen.

      // optional logic to draw the mesh on a canvas
      function onMesh(mesh) {
          // redraw the current state on the the test canvas
          const dstCxt = testCanvas.getContext('2d');
          dstCxt.drawImage(camRef, 0, 0);

          // draw mesh over the test canvas
          drawFaceMeshOnCanvas(mesh.detail, testCanvas);
      }
    </script>

    <FaceMesh image="{camRef}" on:meshesReceived="{onMesh}" />

    <!-- Bind your testCanvas -->

## API

| Parameter    | Type                                                               | Description                                                                                                            |
| ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **maxFaces** | _number_                                                           | The maximum number of faces detected in the input. Should be set to the minimum number for performance. Defaults to 1. |
| **image**    | _ImageData, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement_ | The element that houses the image to be processed                                                                      |

## Events

| Parameter                | Type    | Parameters                                                                                |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| **on:meshesReceived**    | _event_ | Model has created mesh points                                                             |
| **on:modelLoadStarted**  | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |

## Module Exports

| Parameter                | Description                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| **drawFaceMeshOnCanvas** | Helper function to draw a mesh on a canvas, over the modelled points |
