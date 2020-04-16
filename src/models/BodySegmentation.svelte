<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  const dispatch = createEventDispatcher();

  onMount(async () => {});
</script>

<slot />
