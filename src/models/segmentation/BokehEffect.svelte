<script context="module">
  let net
</script>

<script>
  import * as bodyPix from '@tensorflow-models/body-pix'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  export let backgroundBlurAmount = 3
  export let edgeBlurAmount = 3
  export let flipHorizontal = false
  export let outputCanvas
  export let image // ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
  export let verbose = false
  const dispatch = createEventDispatcher()

  onMount(async () => {
    dispatch('modelLoadStarted')
    if (!net) {
      net = await bodyPix.load()
    }
    if (verbose) console.debug('model loaded', net)
    dispatch('modelLoadFinished')
  })

  async function estimateSegmentationOnImage(_image) {
    const segmentation = await net.segmentPerson(_image)
    dispatch('segmentation', segmentation)

    if (outputCanvas && outputCanvas instanceof HTMLCanvasElement) {
      bodyPix.drawBokehEffect(
        outputCanvas,
        _image,
        segmentation,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal,
      )
      dispatch('complete', segmentation)
      if (verbose) console.debug('segmentation complete', segmentation)
    }
  }

  $: if (net && image) {
    estimateSegmentationOnImage(image)
  }
</script>
