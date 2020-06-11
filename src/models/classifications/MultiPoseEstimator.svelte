<script context="module">
  let model

  // Convenience method for getting the bounding box of the keypoints returned in the poses.
  export function getBoundingBox(keypoints) {
    return posenet.getBoundingBox(keypoints)
  }

  // Convenience method for getting the adjeacent keypoints returned in the poses.
  export function getAdjacentKeyPoints(keypoints, minConfidence) {
    return posenet.getAdjacentKeyPoints(keypoints, minConfidence)
  }

  export const minPoseConfidence = 0.15
  export const minPartConfidence = 0.1
</script>

<script>
  import * as posenet from '@tensorflow-models/posenet'
  import { createEventDispatcher, onMount } from 'svelte'

  const dispatch = createEventDispatcher()

  export let image

  export let flipHorizontal = false
  export let maxDetections = 5
  export let scoreThreshold = 0.5
  export let nmsRadius = 30.0

  export let verbose = false

  let poses

  onMount(async () => {
    dispatch('modelLoadStarted')
    if (!model) model = await posenet.load()
    if (verbose) console.debug('model loaded', model)
    dispatch('modelLoadFinished')
  })

  async function estimatePoseOnImage(_image) {
    if (verbose)
      console.debug('estimating poses', {
        flipHorizontal: flipHorizontal,
        maxDetections: maxDetections,
        scoreThreshold: scoreThreshold,
        nmsRadius: nmsRadius,
      })
    // load the posenet model from a checkpoint
    poses = await model.estimateMultiplePoses(_image, {
      flipHorizontal: flipHorizontal,
      maxDetections: maxDetections,
      scoreThreshold: scoreThreshold,
      nmsRadius: nmsRadius,
    })

    dispatch('poses', poses)
    if (verbose) console.debug('poses dispatched', poses)
  }

  $: if (model && image) {
    estimatePoseOnImage(image)
  }
</script>
