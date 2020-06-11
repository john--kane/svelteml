<script>
  import * as automl from '@tensorflow/tfjs-automl'
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  export let modelUrl
  export let centerCrop = true
  export let src //HTMLImageElement, HTMLCanvasElement, HTMLVideoElement, ImageData or a 3D Tensor
  let model

  async function loadModel(modelUrlToLoad) {
    if (!model) {
      dispatch("modelLoadStarted");
      model = await automl.loadImageClassification(modelUrlToLoad)
      dispatch("modelLoadFinished");
    }

    if (src) {
      const predictions = await model.classify(src, { centerCrop: centerCrop })
      dispatch('predict', predictions)
    } else {
      dispatch('error', 'Please enter a modelUrl')
    }
  }

  $: loadModel(modelUrl)
</script>
