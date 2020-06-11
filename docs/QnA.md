# Questions and Answers

A model that takes in a passage of text and can infer answers to questions posed to it.

## Sample Usage

     <script>
        import { QnA } from 'svelteml';

        const passage =
        "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.";
        const question = 'Who is the CEO of Google?';

        // optional
        function onAnswer(answers) {
            console.debug(answers);
        }

     </script>
     <QnA passage="{passage}" question="{question}" on:answers="{onAnswer}" />

\* **passage** is required \* **question** is required

## API

| Parameter    | Type      | Description                                                  |
| ------------ | --------- | ------------------------------------------------------------ |
| **passage**  | _string_  | text to check                                                |
| **question** | _string_  | Question to pose                                             |
| **modelUrl** | _string_  | Custom model URL                                             |
| **verbose**  | _boolean_ | enables debug in the console for debugging, Default is false |

## Events

| Parameter                | Type               | Description                                                                                                                                                |
| ------------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **on:answers**           | _array of objects_ | Triggered when a prediction is made. Allows processing in the caller component's `<script>` not in the markup, which is mostly useful for rendering state. |
| **on:modelLoadStarted**  | _event_            | Lifecycle event, can be useful for rendering 'loading' state before the model is executed                                                                  |
| **on:modelLoadFinished** | _event_            | Lifecycle event, can be useful for rendering 'loading' state before the model is executed                                                                  |

## 🎰 Slot variables

| Parameter       | Type               | Description                                    |
| --------------- | ------------------ | ---------------------------------------------- |
| **let:answers** | _array of objects_ | The raw array of predictions made by the model |
