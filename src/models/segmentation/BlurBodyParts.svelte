<script>
  import * as bodyPix from '@tensorflow-models/body-pix'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  export let backgroundBlurAmount = 3
  export let edgeBlurAmount = 3
  export let flipHorizontal = false
  export let faceBodyPartIdsToBlur = [0, 1] //default,  the face, array of body parts ordinal

  export let outputCanvas
  export let image // ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
  const dispatch = createEventDispatcher()
  let net

  async function blurPartsOnImageChange() {
    if (!net) {
      net = await bodyPix.load()
    }

    if (image && outputCanvas && outputCanvas instanceof HTMLCanvasElement) {
      const partSegmentation = await net.segmentMultiPersonParts(image)
      dispatch('segmentation', partSegmentation)

      bodyPix.blurBodyPart(
        outputCanvas,
        image,
        partSegmentation,
        faceBodyPartIdsToBlur,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal,
      )
      dispatch('complete', partSegmentation)
    }
  }

  $: blurPartsOnImageChange(image)
</script>

<!-- 
Part Id	Part Name	Part Id	Part Name
0	left_face	12	torso_front
1	right_face	13	torso_back
2	left_upper_arm_front	14	left_upper_leg_front
3	left_upper_arm_back	15	left_upper_leg_back
4	right_upper_arm_front	16	right_upper_leg_front
5	right_upper_arm_back	17	right_upper_leg_back
6	left_lower_arm_front	18	left_lower_leg_front
7	left_lower_arm_back	19	left_lower_leg_back
8	right_lower_arm_front	20	right_lower_leg_front
9	right_lower_arm_back	21	right_lower_leg_back
10	left_hand	22	left_feet
11	right_hand	23	right_feet

 -->
