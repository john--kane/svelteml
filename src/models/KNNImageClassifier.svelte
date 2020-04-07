<script>
  import * as mobilenetModule from '@tensorflow-models/mobilenet'
  import * as tf from '@tensorflow/tfjs'
  // import Stats from 'stats.js'
  import * as knnClassifier from '../knnClassifier.js'
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  let classifier, mobilenet, predictions

  export let trainingImages
  export let testImageElement
  //TODO: Create a video version so it can be consumed via Video like: https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier/demo
  onMount(async () => {
    if (!classifier && !mobilenet) {
      classifier = knnClassifier.create()
      mobilenet = await mobilenetModule.load()

      dispatch('classifier_ready', { classifier, mobilenet })
    }

    if (!trainingImages && trainingImages.length == 0) {
      console.log('empty images')
    } else {
      trainingImages.forEach(element => {
        const img0 = tf.browser.fromPixels(element)
        const logits0 = mobilenet.infer(img0, 'conv_preds')
        classifier.addExample(logits0, 0)
      })

      const x = tf.browser.fromPixels(testImageElement)
      const xlogits = mobilenet.infer(x, 'conv_preds')

      predictions = await classifier.predictClass(xlogits)
      console.log(predictions)
      dispatch('prediction', classifier.predictClass(xlogits))
    }
  })
</script>

<slot {classifier} {mobilenet} {predictions} />
