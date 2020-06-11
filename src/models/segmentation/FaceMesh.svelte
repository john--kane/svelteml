<script context="module">
  let model

  function drawPath(ctx, points, closePath) {
    const region = new Path2D()
    region.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
      const point = points[i]
      region.lineTo(point[0], point[1])
    }

    if (closePath) {
      region.closePath()
    }
    ctx.stroke(region)
  }

  export function drawFaceMeshOnCanvas(
    predictions,
    outputCanvas,
    maxFaces = 2,
    triangulateMesh = true,
  ) {
    if (
      predictions.length > 0 &&
      outputCanvas &&
      outputCanvas instanceof HTMLCanvasElement
    ) {
      let state = {
        // backend: "wasm",
        maxFaces: maxFaces,
        triangulateMesh: triangulateMesh,
      }

      const ctx = outputCanvas.getContext('2d')

      let scatterGLHasInitialized = false

      for (let index = 0; index < predictions.length; index++) {
        const prediction = predictions[index]
        const keypoints = prediction.scaledMesh

        if (state.triangulateMesh) {
          for (let i = 0; i < TRIANGULATION.length / 3; i++) {
            const points = [
              TRIANGULATION[i * 3],
              TRIANGULATION[i * 3 + 1],
              TRIANGULATION[i * 3 + 2],
            ].map((index) => keypoints[index])

            drawPath(ctx, points, true)
          }
        } else {
          for (let i = 0; i < keypoints.length; i++) {
            const x = keypoints[i][0]
            const y = keypoints[i][1]

            ctx.beginPath()
            ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      }

      if (state.renderPointcloud && scatterGL != null) {
        const pointsData = predictions.map((prediction) => {
          let scaledMesh = prediction.scaledMesh
          return scaledMesh.map((point) => [-point[0], -point[1], -point[2]])
        })

        let flattenedPointsData = []
        for (let i = 0; i < pointsData.length; i++) {
          flattenedPointsData = flattenedPointsData.concat(pointsData[i])
        }
        const dataset = new ScatterGL.Dataset(flattenedPointsData)

        if (!scatterGLHasInitialized) {
          scatterGL.render(dataset)
        } else {
          scatterGL.updateDataset(dataset)
        }
        scatterGLHasInitialized = true
      }
    }
  }
</script>

<script>
  import * as facemesh from '@tensorflow-models/facemesh'
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import { TRIANGULATION } from '../../utils/Triangulation'
  const dispatch = createEventDispatcher()

  export let image
  export let maxFaces = 1
  export let verbose = false

  onMount(async () => {
    dispatch('modelLoadStarted')
    if (!model) model = await facemesh.load()

    if (verbose) console.debug('model loaded', net)
    dispatch('modelLoadFinished')
  })

  async function estimateFaces(_image) {
    const predictions = await model.estimateFaces(_image)
    dispatch('meshesReceived', predictions)
  }

  $: if (model && image) {
    estimateFaces(image)
  }
</script>
