<script>
  import * as mobilenet from '@tensorflow-models/mobilenet'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  const version = 2
  const alpha = 0.5

  export let src
  export let mobileNetConfig = { version, alpha }
  export let verbose = false

  let image
  let model
  let predictions = []

  async function classify(_image) {
    if (!model) model = await mobilenet.load(mobileNetConfig)

    if (_image && model) {
      // should be a valid image on the dom and model loaded.
      predictions = await model.classify(_image)
      dispatch('predict', predictions)

      if (verbose) {
        const logits = model.infer(_image)
        dispatch('logits', logits)
        logits.print(true)

        // Get the embedding.
        const embedding = model.infer(_image, true)
        embedding.print(true)
        dispatch('embeddings', embedding)
      }
    }
  }

  $: classify(image)
</script>

<img {src} bind:this={image} alt="classifiedImage" />
<slot {predictions} />
