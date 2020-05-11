<script>
  import {
    createEventDispatcher
  } from "svelte";
  import {
    onMount
  } from "svelte";
  const dispatch = createEventDispatcher();

  let recogniser;
  let words = [];
  let predictions = []; // {score: number, word:string}
  let recording = false;
  let loading = false;

  onMount(async () => {});
  async function initRecogniser() {
    try {
      this.loading = true;
      this.recogniser = speech.create("BROWSER_FFT");
      await this.recogniser.ensureModelLoaded();
      this.words = this.recogniser.wordLabels();
      this.recording = true;
      this.loading = false;
      this.recogniser.listen(
        async result => {
          const scores = Array.from(result.scores).map((s, i) => ({
            score: s,
            word: this.words[i]
          }));
          scores.sort((s1, s2) => s2.score - s1.score);
          this.predictions.push(scores.splice(0, 1)[0]);
        }, {
          probabilityThreshold: 0.9
        }
      );
    } catch (error) {
      this.loading = false;
      throw e;
    }
  }

  async function stopRecogniser() {
    await this.recogniser.stopListening();
    this.recording = false;
    this.predictions = [];
  }

  // import * as speech from "@tensorflow-models/speech-commands";
</script>

<button on:click={initRecogniser}>Start Recording</button>