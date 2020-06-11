# Body Segmentation

Generic Multi Person Body Segmentation and wider controls coming soon.

## Sample Usage

    <script>
      import { BodySegmentation, drawMaskOnCanvas } from 'svelteml'

      let camRef // input: TODO: get image, video or canvas source
      let testCanvas // output: TODO: bind a canvas if you want to output the effect of the blur to the screen.

      // optional
      function onSegmentation(segmentation) {
        // redraw the current state on the the test canvas
        const dstCxt = testCanvas.getContext('2d');
        dstCxt.drawImage(camRef, 0, 0);

        // draw mesh over the test canvas
        const segmentations = segmentation.detail;
        drawMaskOnCanvas(testCanvas, camRef, segmentations);
    }
    </script>

    <!-- Add on:segmentation="{onSegmentation}" if you want access to the raw data -->
    <BodySegmentation image="{camRef}" on:segmentation="{onSegmentation}" />

    <!-- Bind your testCanvas -->

| Parameter        | Type     | Description                                                      |
| ---------------- | -------- | ---------------------------------------------------------------- |
| **architecture** | _string_ | Can be either MobileNetV1 or ResNet50, as per tfjs documentation |
| **outputStride** | _number_ | Default: 16                                                      |
| **multiplier**   | _number_ | Default: 0.75                                                    |
| **quantBytes**   | _number_ | Default: 2                                                       |

## Events

| Event                    | Type    | Description                                                                               |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| **on:segmentation**      | _event_ | Segmentation object with the output from Body Pix's segmentMultiPersonParts method.       |
| **on:modelLoadStarted**  | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |

## Module Exports

| Function / Const     | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| **drawMaskOnCanvas** | This is a wrapper for the drawMask function in the bodyPix model |

## Usages

- [Bokeh Effect](BokehEffect.md)
- [Blurred Body Parts](BlurBodyParts.md)
