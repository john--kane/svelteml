<script>
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
  import * as cocoSsd from '@tensorflow-models/coco-ssd'

  const dispatch = createEventDispatcher()
  export let image //tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, maxDetectionSize: number
  export let base = 'lite_mobilenet_v2' // 'mobilenet_v1', 'mobilenet_v2' or 'lite_mobilenet_v2'. Defaults to 'lite_mobilenet_v2'.
  export let modelUrl
  export let maxNumBoxes = 20 // Defaults to 20.
  export let debugCanvas

  let model

  async function makePredictions(_image) {
    if (!model) {
      if (modelUrl) {
        model = await cocoSsd.load({
          base: base,
          modelUrl: modelUrl,
        })
      } else {
        model = await cocoSsd.load({
          base: base,
        })
      }
    }

    const predictions = await model.detect(image, maxNumBoxes)
    dispatch('predict', predictions)

    if (debugCanvas) {
      const ctx = debugCanvas.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth = '1'
      ctx.strokeStyle = 'red'

      predictions.forEach(prediction => {
        ctx.strokeRect(
          prediction.bbox[0],
          prediction.bbox[1],
          prediction.bbox[2],
          prediction.bbox[3],
        )
      })
    }
  }

  $: makePredictions(image)
</script>
