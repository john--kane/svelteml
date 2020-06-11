<script context="module">
	let model;
</script>


<script>
  import * as mobilenet from '@tensorflow-models/mobilenet'
  import { createEventDispatcher, onMount} from 'svelte'
  const dispatch = createEventDispatcher()

  const version = 2
  const alpha = 0.5

  export let mobileNetConfig = { version, alpha }
  export let verbose = false
  export let image
 
  let predictions = []

  onMount(async () => {
    if (!model) {
      if(verbose)console.time("Model loading")
      dispatch("modelLoadStarted");
      model = await mobilenet.load(mobileNetConfig)
      dispatch("modelLoadFinished");
      if(verbose)console.timeEnd("Model loading")
    }
    // in case there is only one image and not a stream.
    classify(image);
  });


  async function classify(_image) {
    
    if (_image) {
      // should be a valid image on the dom and model loaded.
      predictions = await model.classify(_image)
      dispatch('predict', predictions)

      if(verbose)console.time("Embeddings Started")
      const logits = model.infer(_image)
      dispatch('logits', logits)
      logits.print(true)

      // Get the embedding.
      const embedding = model.infer(_image, true)
      if(verbose) embedding.print(true)
      dispatch('embeddings', embedding)
      if(verbose)console.timeEnd("Embeddings Started")
    }
  }

  $: if(model) {
    classify(image)
  }
</script>

<slot {predictions} />
