# Object Detecction

![](_media/objectdetection.jpeg)

<small>Example of general Object Detection</small>

## Example Snippet

    <script>
      import { ObjectDetection } from 'svelteml'

      let camRef // input: TODO: get image, video or canvas source

      function onPredict(predictions) {
        console.log(predictions);
      }
    </script>

    <ObjectDetection image="{camRef}" />

## API

| Parameter       | Type                                                                  | Description                                                                                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **base**        | _string_                                                              | Controls the base cnn model, can be 'mobilenet_v1', 'mobilenet_v2' or 'lite_mobilenet_v2'. Defaults to 'lite_mobilenet_v2'. lite_mobilenet_v2 is smallest in size, and fastest in inference speed. mobilenet_v2 has the highest classification accuracy. |
| **modelUrl**    | _string_                                                              | An optional string that specifies custom url of the model. This is useful for area/countries that don't have access to the model hosted on GCP.                                                                                                          |
| **image**       | _ImageData , HTMLImageElement , HTMLCanvasElement , HTMLVideoElement_ | Content to be evaluated for Object Detection                                                                                                                                                                                                             |
| **maxNumBoxes** | _number_                                                              | The maximum number of bounding boxes of detected objects. There can be multiple objects of the same class, but at different locations. Defaults to 20.                                                                                                   |

## Events

| Parameter                | Type               | Description                                                                               |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------------- |
| **on:predict**           | _array of objects_ | The raw array of predictions made by the model                                            |
| **on:modelLoadStarted**  | _event_            | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_            | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |

## 🎰 Slot variables

| Parameter           | Type    | Description                                                                  |
| ------------------- | ------- | ---------------------------------------------------------------------------- |
| **let:predictions** | _array_ | Tells your reactive code when the predictions for the given image are ready. |

## Model Information

If you want more information on the model and the segmentation therein.

https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
