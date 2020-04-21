<script>
  import * as bodyPix from '@tensorflow-models/body-pix'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  export let architecture = 'MobileNetV1' //Can be either MobileNetV1 or ResNet50
  export let outputStride = 16
  export let multiplier = 0.75
  export let quantBytes = 2
  export let debugCanvas
  export let image // ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
  const dispatch = createEventDispatcher()
  let net

  async function estimateSegmentationOnImage() {
    if (!net) {
      net = await bodyPix.load({
        architecture: architecture,
        outputStride: outputStride,
        multiplier: multiplier,
        quantBytes: quantBytes,
      })
    }
    if (image) {
      const segmentation = await net.segmentMultiPerson(image, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.7,
        maxDetections: 10,
        scoreThreshold: 0.2,
        nmsRadius: 20,
        minKeypointScore: 0.3,
        refineSteps: 10,
      })
      dispatch('segmentation', segmentation)

      if (debugCanvas && debugCanvas instanceof HTMLCanvasElement) {
        renderOnCanvas(segmentation)
      } else {
        dispatch(
          'error:debug',
          'Incorrect type, please supply a HTMLCanvasElement to render into.',
        )
      }
    }
  }
  function renderOnCanvas(segmentation) {
    const ctx = debugCanvas.getContext('2d')

    const coloredPartImage = bodyPix.toMask(segmentation)
    const opacity = 0.7
    const flipHorizontal = false
    const maskBlurAmount = 0

    bodyPix.drawMask(
      debugCanvas,
      image,
      coloredPartImage,
      opacity,
      maskBlurAmount,
      flipHorizontal,
    )
    dispatch('segmentationDrawn')
  }

  $: estimateSegmentationOnImage(image)
</script>
