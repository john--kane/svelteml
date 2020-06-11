# Auto ML Image Classifier

Pulls in the AutoML model and classifies based on that. Different than the ImageClassifier, that uses MobileNet to classify

## Sample Usage

     <script>
        const MODEL_URL = 'https://storage.googleapis.com/tfjs-testing/tfjs-automl/img_classification/model.json'
        let sampleImage, results
        function onPrediction(predictions) {
            results = JSON.stringify(predictions.detail, null, '\t')
        }
     </script>
     <AutoMLImageClassifier modelUrl={MODEL_URL} src={sampleImage} on:predict={onPrediction}/>

    <!-- Do something with the results -->

## API

| Parameter      | Type             | Description                                                                                                                     |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **src**        | HTMLImageElement | The source image to classify                                                                                                    |
| **centerCrop** | _boolean_        | If the crop should be centered (obviously ;) )                                                                                  |
| **modelUrl**   | _string_         | URL to the model classifier . Defaults to https://storage.googleapis.com/tfjs-testing/tfjs-automl/img_classification/model.json |

## Events

| Parameter                | Type    | Description                                                                               |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| **on:modelLoadStarted**  | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:modelLoadFinished** | _event_ | Lifecycle event, can be useful for rendering 'loading' state before the model is executed |
| **on:predict**           | _event_ | The model has a prediction                                                                |
