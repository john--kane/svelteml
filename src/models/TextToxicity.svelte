<script>
  import { onMount } from 'svelte'
  import * as toxicity from '@tensorflow-models/toxicity'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  export let samples
  export let verbose = false

  let model, labels
  let predictions
  let modelsLoaded = false
  const classify = async inputs => {
    const results = await model.classify(inputs)
    return inputs.map((d, i) => {
      const obj = { text: d }
      results.forEach(classification => {
        obj[classification.label] = classification.results[i].match
      })
      return obj
    })
  }

  async function predict(_samples) {
    if (!model) {
      if (verbose) console.debug('loading models')
      model = await toxicity.load()
      if (verbose) console.debug('model loaded')
      modelsLoaded = true
    }

    labels = model.model.outputNodes.map(d => d.split('/')[0])
    predictions = await classify(_samples.map(d => d.text))
    if (verbose) console.debug(labels)
    if (verbose) console.debug(predictions)

    dispatch('prediction', predictions)
  }
  $: predict(samples)
</script>

<slot {predictions} {labels} {model} {modelsLoaded} />
