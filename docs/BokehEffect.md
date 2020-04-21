# Bokeh Effect

Bokeh is defined as “the effect of a soft out-of-focus background that you get when shooting a subject, using a fast lens, at the widest aperture, such as f/2.8 or wider.” Simply put, bokeh is the pleasing or aesthetic quality of out-of-focus blur in a photograph.

![](_media/bokeh.gif)
<small>Example of the Bokeh effect, end result on your image might be different</small>

## Sample Usage

    <script>
      import { BokehEffect } from 'svelteml'
      import { onMount } from 'svelte'

      let captureImage // reactive image for passing to estimator
      let outputCanvas // to display results of the poses

      onMount(async () => {
        // TODO: get image, video or canvas source and add it to captureImage
      })

      function onBokehComplete(segmentation) {
        // TODO: If you want custom behaviour, then use the on:complete and you'll get the bokeh segmentation result
        console.log(segmentation);
      }
    </script>

    {#if captureImage}
        <!-- if you want to do something with the segmentation then add the on:complete event handler -->
        <BokehEffect image={captureImage} outputCanvas={outputCanvas} on:complete={onBokehComplete} />
    {/if}

## API

| Parameter                | Type                                                               | Description                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **backgroundBlurAmount** | _number_                                                           | How many pixels in the background blend into each other. Defaults to 3. Should be an integer between 1 and 20.                      |
| **edgeBlurAmount**       | _number_                                                           | How many pixels to blur on the edge between the person and the background by. Defaults to 3. Should be an integer between 0 and 20. |
| **flipHorizontal**       | _boolean_                                                          | If the output should be flipped horizontally. Defaults to false.                                                                    |
| **outputCanvas**         | _HTMLCanvasElement_                                                | The HTML Canvas where the end effect will be rendered                                                                               |
| **image**                | _ImageData, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement_ | The element that houses the image to be processed                                                                                   |

## Events

| Parameter           | Type    | Parameters                                                                                             |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| **on:segmentation** | _event_ | Segmentation object with the output from Body Pix's segmentPerson method.                              |
| **on:complete**     | _event_ | This is triggered only when the segmentation and the bokeh effect has been applied to the outputCanvas |

## Model Information

If you want more information on the model and the segmentation therein.

https://github.com/tensorflow/tfjs-models/tree/master/body-pix
