# Hand Pose Detection

## Sample Usage

    <script>
      import { HandPoseDetection, drawHandKeypoints } from 'svelteml';

      let camRef // input: TODO: get image, video or canvas source
      let testCanvas // output: TODO: bind a canvas if you want to output the effect of the blur to the screen.

      // optional logic to draw the hand tracking on a canvas
      function onHands(hands) {
        // redraw the current state on the the test canvas
        const dstCxt = testCanvas.getContext('2d');
        dstCxt.drawImage(camRef, 0, 0);

        // draw mesh over the test canvas
        const predictions = hands.detail;
        if (predictions.length > 0) {
            drawHandKeypoints(testCanvas, predictions);
        }
    }
    </script>

    <HandPoseDetection image="{camRef}" on:hands="{onHands}" />

    <!-- Bind your testCanvas -->

## API

| Parameter | Type                                                               | Description                                                                               |
| --------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **image** | _ImageData, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement_ | The element that houses the image to be processed. Poses will be rendered on top of image |

## Events

| Parameter                | Type    | Description                                                                               |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| **on:hands**             | _event_ | The raw predictions outputted from the model                                              |
| **on:modelLoadStarted**  | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
