<script>
  import * as mobilenet from "@tensorflow-models/mobilenet";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let image;
  export let mobileNetConfig;
  export let infer = false;
  let model;
  let predictions;

  onMount(async () => {
    if (mobileNetConfig) {
      model = await mobilenet.load(mobileNetConfig);
    } else {
      model = await mobilenet.load();
    }
  });

  async function classify(_image) {
    if (_image && model) {
      // should be a valid image on the dom and model loaded.
      if (checkType(_image)) {
        let predictions = await model.classify(_image);
        dispatch("predict", predictions);
        if (infer) {
          const logits = model.infer(img);
          dispatch("logits", logits);

          // TODO: Add embeddings here
        }
      } else {
        dispatch("error", "not valid");
      }
    }
  }

  function checkType(element) {
    // tf.Tensor3D | ImageData | HTMLImageElement |
    //   HTMLCanvasElement | HTMLVideoElement
    return true;
  }

  $: classify(image);
</script>

<slot {predictions} />
