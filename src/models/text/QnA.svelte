<script context="module">
  let model
</script>

<script>
  import * as qna from '@tensorflow-models/qna'
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  export let passage
  export let question
  export let modelUrl //{modelUrl: 'https://yourown-server/qna/model.json'};
  export let verbose = false

  let answers

  onMount(async () => {
    console.debug('Model', model)

    dispatch('modelLoadStarted')
    if (!model) {
      if (verbose) console.debug('Model')
      if (modelUrl) {
        model = await qna.load({ modelUrl: modelUrl })
      } else {
        model = await qna.load()
      }
    }
    dispatch('modelLoadFinished')

    // first time round, we can initialise it if there is already content to parse and no answers provided directly on init
    if (!answers && question && passage) {
      init(question, passage)
    }
  })

  async function init(question, passage) {
    answers = await model.findAnswers(question, passage)
    if (verbose) console.debug(answers)
    dispatch('answers', answers)
  }

  $: if (model && question && passage) {
    init(question, passage)
  }
</script>

<slot {answers} />
