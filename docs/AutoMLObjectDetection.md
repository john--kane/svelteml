# Auto ML Object Detector

Pulls in the AutoML model and detects based on that.

## Sample Usage

     <script>
        const MODEL_URL = 'https://storage.googleapis.com/tfjs-testing/tfjs-automl/object_detection/model.json'
        let sampleImage, results
        function onPrediction(predictions) {
            results = JSON.stringify(predictions.detail, null, '\t')
        }
     </script>
     <AutoMLObjectDetect modelUrl="{MODEL_URL}" src="{sampleImage}" on:predict="{onPrediction}" />
    <!-- Do something with the results -->

## API

| Parameter    | Type             | Description                                                                                                                               |
| ------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **src**      | HTMLImageElement | The source image to classify                                                                                                              |
| **score**    | _number_         | Probability score between 0 and 1. Defaults to 0.5. Boxes with score lower than this threshold will be ignored                            |
| **topk**     | _number_         | Only the topk most likely objects are returned. The actual number of objects might be less than this number.                              |
| **modelUrl** | _number_         | If you want another model url to be used. Defaults to https://storage.googleapis.com/tfjs-testing/tfjs-automl/object_detection/model.json |
| **verbose**  | _boolean_        | Additional logging to console                                                                                                             |

## Events

| Parameter                | Type    | Description                                                                               |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| **on:modelLoadStarted**  | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:predict**           | _event_ | The model has a prediction                                                                |
| **on:predictionStarted** | _event_ | Tells you when the prediction started                                                     |
