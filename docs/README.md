# SvelteML

    npm install svelteml --save

> Work in Progress

![svelteml](https://github.com/john--kane/svelteml/blob/master/src/svelteml.png?raw=true)

Hi! Svelte JS tries to remove some of the complexity of large reactive JS apps to the compiler, producing tree-shaken small app footprints in the meantime, all without a Virtual DOM. 

This library is combined with Tensorflow JS to add Machine learning features to any Svelte app. The aim is make it as simple as possible to integrate ML into your app.

# Text Toxicity

Ideal for things like customer reviews or somewhere you need to review what user writes before it gets sent. A pre-check before your server has to do the work.

     <TextToxicity  {samples} verbose={true} on:prediction={yourHandlerFunction}  
    	 let:modelsLoaded
    	 let:predictions
    	 let:labels>
              <!-- Your reactive code here -->
     </TextToxicity>

\* **samples** is required

|        Parameter        |Type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|**samples**|*array of objects*   |The sentences to evaluate are in the 'text' field. E.g.  `[{text: 'text to check'}]` |
|**on:prediction**|*event*   |triggered when a prediction comes in from Tensorflow. 
|**let:modelsLoaded**|*boolean*   |tells you when the TF models etc are downloaded and ready to use. In the meantime, show a loading spinner in your reactive code |
|**let:predictions**|*array*   |tells your reactive code when the predictions for the given samples are ready.  |
|**let:labels**|*array*   |is a list of prediction labels that appear in the predictions array response. Available after models are loaded  |
|**verbose**|*boolean*   | enabled console logging for debugging purposes.  |

> **on:prediction:** Allows processing in the caller component's `<script>` not in the markup, which is mostly useful for rendering state.

# Image Classifier

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
	

\* **src** is required

|        Parameter        |Type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|**src**|*string*   | The image resource to classify |
|**mobileNetConfig**|*object*   |defaults to { version: 2, alpha: 0.5 } , please refer to [https://github.com/tensorflow/tfjs-models/tree/master/mobilenet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) for more config options. e.g. (modelUrl?: string, inputRange?: [number, number])
|**verbose**|*boolean*   | enabled console logging for debugging purposes.  |
|**on:predict**|*event*   |triggered when a prediction comes in from Tensorflow. 
|**on:logits**|*event*   |triggered when verbose is set to true and logits come in from Tensorflow. 
|**on:embeddings**|*event*   |triggered when verbose is set to true and embeddings come in from Tensorflow. 
|**let:predictions**|*array*   |tells your reactive code when the predictions for the given image are ready.  |


# Multi Pose Estimation

This element can take in an image and calculate the poses of multiple people within it. It can render out debug information onto a canvas element you pass in but you can also just pass in the image and it will return a poses event to describe the points estimated.

Only uses the MobileNet architecture currently

     <MultiPoseEstimator 
	     image={captureImage} 
	     on:poses={onPose}
	     debugCanvas={capture}
	     flipHorizontal={false}
	     maxDetections={5}
	     scoreThreshold={0.5}
	     minPoseConfidence={0.15}
	     minPartConfidence={0.1}
	     nmsRadius={30.0}
	     />
	

\* **image** is required
\* **on:poses={eventFunction}** is required

\* Throws  an error:debug event if the debugCanvas is not an instance of HTMLCanvasElement 

|        Parameter        |Type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|**image**|*HTMLCanvasElement*   | The image resource to estimate (e.g. frame of a video) |
|**debugCanvas**|*HTMLCanvasElement*   |**optional* allows you to see what pose was calculated. The points will be rendered on top of whatever canvas you send in.
|**flipHorizontal**|*boolean*   |**optional* Defaults to false. If the pose should be flipped/mirrored horizontally [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)  |
|**maxDetections**|*number*   |**optional*  the maximum number of poses to detect. Defaults to 5. [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)  |
|**scoreThreshold**|*number*   |**optional*  Only return instance detections that have root part score greater or equal to this value. Defaults to 0.5. [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)  |
|**minPoseConfidence**|*number*   |**optional* Tolerance for pose confidence, only used in debugCanvas rendering  |
|**minPartConfidence**|*number*   |**optional* Tolerance for part confidence, only used in debugCanvas rendering [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)  |
|**nmsRadius**|*number*   |**optional* Non-maximum suppression part distance. It needs to be strictly positive. Two parts suppress each other if they are less than `nmsRadius` pixels away. Defaults to 30.0 [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)  |
|**on:poses**|*event*   | Triggered when the estimator has finished with calculating the poses for the inputted image  |


# What's next

 - [ ] Body Segmentation
 - [x] Image Classification
 - [ ] KNN Classifier
 - [ ] Object Detection
 - [x] Basic Multi-Pose Estimation
 - [x] Sentence Encoding
 - [x] Text Toxicity
 - [ ] Speech Command Recognition
