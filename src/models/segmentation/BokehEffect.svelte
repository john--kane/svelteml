<script>
  import * as bodyPix from '@tensorflow-models/body-pix'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  export let backgroundBlurAmount = 3
  export let edgeBlurAmount = 3
  export let flipHorizontal = false
  export let outputCanvas
  export let image // ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
  const dispatch = createEventDispatcher()
  let net

  async function estimateSegmentationOnImage() {
    if (!net) {
      net = await bodyPix.load()
    }

    if (image && outputCanvas && outputCanvas instanceof HTMLCanvasElement) {
      const segmentation = await net.segmentPerson(image)
      dispatch('segmentation', segmentation)
      bodyPix.drawBokehEffect(
        outputCanvas,
        image,
        segmentation,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal,
      )
      dispatch('complete', segmentation)
    }
  }

  $: estimateSegmentationOnImage(image)
</script>
