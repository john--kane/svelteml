# Image Classifier

## Example Usage

This component renders and image and bind this image to predictions made by the Classifier model. The reactive markup inside the ImageClassifier tag will be rendered after the `<img src={src} />`

     <ImageClassifier  src="image-classifier/coffee.jpg"  let:predictions>
    	{#each  predictions  as  item}
    		<div>
    			<div>{item.className}</div>
    			<div>{item.probability}</div>
    		</div>
    	{:else}
    		<div>No elements</div>
    	{/each}

    </ImageClassifier>

## API

| Parameter           | Type      | Description                                                                                                                                                                                                                                                                  |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **src**             | _string_  | Required. The image resource to classify                                                                                                                                                                                                                                     |
| **mobileNetConfig** | _object_  | Defaults to { version: 2, alpha: 0.5 } , please refer to [https://github.com/tensorflow/tfjs-models/tree/master/mobilenet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) for more config options. e.g. (modelUrl?: string, inputRange?: [number, number]) |
| **verbose**         | _boolean_ | Enabled console logging for debugging purposes.                                                                                                                                                                                                                              |

## Events

| Parameter         | Type    | Parameters                                                                                                            |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| **on:predict**    | _event_ | Triggered when the model has classified the image                                                                     |
| **on:logits**     | _event_ | Triggers when the logits for this prediction has been made by the model. Only available if verbose is set to true     |
| **on:embeddings** | _event_ | Triggers when the embeddings for this prediction has been made by the model. Only available if verbose is set to true |

## 🎰 Slot variables

| Parameter           | Type    | Parameters                                                                   |
| ------------------- | ------- | ---------------------------------------------------------------------------- |
| **let:predictions** | _array_ | Tells your reactive code when the predictions for the given image are ready. |
