<script context="module">
  let model
</script>

<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'

  import * as cocoSsd from '@tensorflow-models/coco-ssd'

  const dispatch = createEventDispatcher()
  export let image //tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, maxDetectionSize: number
  export let base = 'lite_mobilenet_v2' // 'mobilenet_v1', 'mobilenet_v2' or 'lite_mobilenet_v2'. Defaults to 'lite_mobilenet_v2'.
  export let modelUrl = ''
  export let maxNumBoxes = 20 // Defaults to 20.
  export let verbose = false
  // export let debug = false
  let predictions

  onMount(async () => {
    if (!model) {
      if (modelUrl && modelUrl.length > 0) {
        dispatch('modelLoadStarted')
        model = await cocoSsd.load({
          base: base,
          modelUrl: modelUrl,
        })
        dispatch('modelLoadFinished')
      } else {
        dispatch('modelLoadStarted')
        model = await cocoSsd.load({
          base: base,
        })
        dispatch('modelLoadFinished')
      }
      if (verbose) console.debug('creating model', model)
    }
  })

  async function makePredictions(_image) {
    // check if model is in the store, otherwise create a new model.

    if (verbose) console.debug('reading model', model, _image)
    if (_image) {
      predictions = await model.detect(_image, maxNumBoxes)
      dispatch('predict', predictions)
      if (verbose) console.debug(predictions)
    }
  }

  $: if (model) {
    makePredictions(image)
  }
</script>

<slot {predictions} />
