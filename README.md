# SvelteML

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

|        Parameter        |Type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|**samples**|*array of objects*   |The sentences to evaluate are in the 'text' field. E.g.  `[{text: 'text to check'}]` |
|**on:prediction**|*event*   |triggered when a prediction comes in from Tensorflow. 
|**modelsLoaded**|*boolean*   |tells you when the TF models etc are downloaded and ready to use. In the meantime, show a loading spinner in your reactive code |
|**predictions**|*array*   |tells your reactive code when the predictions for the given samples are ready.  |
|**labels**|*array*   |is a list of prediction labels that appear in the predictions array response. Available after models are loaded  |
|**verbose**|*boolean*   | enabled console logging for debugging purposes.  |

> **on:prediction:** Allows processing in the caller component's `<script>` not in the markup, which is mostly useful for rendering state.
