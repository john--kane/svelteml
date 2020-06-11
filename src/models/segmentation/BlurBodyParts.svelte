<script context="module">
  let net

  export const BodyParts = {
    left_face: 0,
    right_face: 1,
    left_upper_arm_front: 2,
    left_upper_arm_back: 3,
    right_upper_arm_front: 4,
    right_upper_arm_back: 5,
    left_lower_arm_front: 6,
    left_lower_arm_back: 7,
    right_lower_arm_front: 8,
    right_lower_arm_back: 9,
    left_hand: 10,
    right_hand: 11,
    torso_front: 12,
    torso_back: 13,
    left_upper_leg_front: 14,
    left_upper_leg_back: 15,
    right_upper_leg_front: 16,
    right_upper_leg_back: 17,
    left_lower_leg_front: 18,
    left_lower_leg_back: 19,
    right_lower_leg_front: 20,
    right_lower_leg_back: 21,
    left_feet: 22,
    right_feet: 23,
  }
</script>

<script>
  import * as bodyPix from '@tensorflow-models/body-pix'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  // export let outputCanvas
  export let image // ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
  export let outputCanvas
  export let verbose = false
  export let backgroundBlurAmount = 3
  export let edgeBlurAmount = 3
  export let flipHorizontal = false
  export let faceBodyPartIdsToBlur = [0, 1] //default,  the face, array of body parts ordinal

  const dispatch = createEventDispatcher()

  onMount(async () => {
    dispatch('modelLoadStarted')
    if (!net) {
      net = await bodyPix.load()
    }
    if (verbose) console.debug('model loaded', net)
    dispatch('modelLoadFinished')
  })

  async function performSegmentation(_image) {
    const partSegmentation = await net.segmentMultiPersonParts(_image)
    dispatch('segmentation', partSegmentation)

    if (
      partSegmentation &&
      outputCanvas &&
      outputCanvas instanceof HTMLCanvasElement
    ) {
      if (verbose) console.debug('attempting blur')
      bodyPix.blurBodyPart(
        outputCanvas,
        _image,
        partSegmentation,
        faceBodyPartIdsToBlur,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal,
      )
      if (verbose) console.debug('blur finished')
    }
    if (verbose) console.debug('segmentation complete', partSegmentation)
  }

  $: if (net && image) {
    performSegmentation(image)
  }
</script>
