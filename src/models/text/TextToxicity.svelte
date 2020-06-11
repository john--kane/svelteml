<script context="module">
  let model
</script>

<script>
  import { onMount } from 'svelte'
  import * as toxicity from '@tensorflow-models/toxicity'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let samples
  export let verbose = true

  let labels, predictions

  const classify = async (inputs) => {
    const results = await model.classify(inputs)
    return inputs.map((d, i) => {
      const obj = { text: d }
      results.forEach((classification) => {
        obj[classification.label] = classification.results[i].match
      })
      return obj
    })
  }

  async function predict(_samples) {
    labels = model.model.outputNodes.map((d) => d.split('/')[0])
    console.debug('Predicting')
    dispatch('labels', labels)

    predictions = await classify(_samples.map((d) => d.text))
    if (verbose) console.debug(labels)
    if (verbose) console.debug(predictions)

    dispatch('prediction', predictions)
  }

  onMount(async () => {
    if (!model) {
      dispatch('modelLoadStarted')
      model = await toxicity.load()
      dispatch('modelLoadFinished')
    }
  })

  $: if (model && samples && samples.length > 0) {
    predict(samples)
  }
</script>

<slot {predictions} {labels} {model} />
