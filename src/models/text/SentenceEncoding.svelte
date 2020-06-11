<script context="module">
  let model
</script>

<script>
  import * as use from '@tensorflow-models/universal-sentence-encoder'
  import { onMount, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let sentences

  let embeddings,
    model,
    verbose = false

  async function init(_sentences) {
    if (_sentences && _sentences.length > 0) {
      embeddings = await model.embed(_sentences)
      dispatch('embeddings', embeddings)
    } else {
      dispatch('error', 'No sentences submitted')
    }
  }

  onMount(async () => {
    dispatch('modelLoadStarted')
    if (!model) model = await use.load()
    dispatch('modelLoadFinished')
  })

  $: if (model && sentences) {
    init(sentences)
  }
</script>

<slot {embeddings} />
