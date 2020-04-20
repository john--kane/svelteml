<script>
  import * as posenet from '@tensorflow-models/posenet'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  //https://github.com/tensorflow/tfjs-models/blob/master/posenet/demos/
  import {
    drawKeypoints,
    drawSkeleton,
    drawBoundingBox,
    isMobile,
  } from '../utils/PoseUtils'
  const dispatch = createEventDispatcher()

  export let image

  export let flipHorizontal = false
  export let maxDetections = 5
  export let scoreThreshold = 0.5
  export let minPoseConfidence = 0.15
  export let minPartConfidence = 0.1
  export let nmsRadius = 30.0
  export let debugCanvas // the canvas theparent supplies to render the debug info

  let net
  let poses

  async function estimatePoseOnImage(imageElement) {
    // load the posenet model from a checkpoint
    if (!net) net = await posenet.load()

    if (imageElement && net) {
      poses = await net.estimateMultiplePoses(image, {
        flipHorizontal: flipHorizontal,
        maxDetections: maxDetections,
        scoreThreshold: scoreThreshold,
        nmsRadius: nmsRadius,
      })

      dispatch('poses', poses)

      if (debugCanvas && debugCanvas instanceof HTMLCanvasElement) {
        renderOnCanvas()
      } else {
        dispatch(
          'error:debug',
          'Incorrect type, please supply a HTMLCanvasElement to render into.',
        )
      }
    }
  }

  function renderOnCanvas() {
    const ctx = debugCanvas.getContext('2d')
    let concatPoses = []
    concatPoses = concatPoses.concat(poses)
    let _minPoseConfidence = +minPoseConfidence
    let _minPartConfidence = +minPartConfidence

    concatPoses.forEach(({ score, keypoints }) => {
      if (score >= _minPoseConfidence) {
        drawKeypoints(keypoints, _minPartConfidence, ctx)
        drawSkeleton(keypoints, _minPartConfidence, ctx)
        drawBoundingBox(keypoints, ctx)
      }
    })

    dispatch('poseDrawn')
  }

  $: estimatePoseOnImage(image)
</script>
