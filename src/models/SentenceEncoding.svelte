<script>
  import * as use from '@tensorflow-models/universal-sentence-encoder'
  import { createEventDispatcher } from 'svelte'

  let embeddings
  let modelsLoaded = false
  const dispatch = createEventDispatcher()

  export let sentences

  async function init() {
    modelsLoaded = false
    const model = await use.load()
    modelsLoaded = true

    embeddings = await model.embed(sentences)
    dispatch('embeddings', embeddings)
  }

  init()
</script>

<slot {modelsLoaded} />
