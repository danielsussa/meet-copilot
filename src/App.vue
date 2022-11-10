<template>
  <div class="waiting-container" v-if="!isRecording">
    <h1>Meet Wingman - <span class="w1">Waiting for some signal<UnderscoreComponent></UnderscoreComponent></span></h1>
    <h2></h2>
  </div>
  <MeetComponent v-if="isRecording" :events="currEvents"></MeetComponent>
</template>

<script>
import MeetComponent from "@/components/MeetComponent";
import UnderscoreComponent from "@/components/UnderscoreComponent";

export default {
  name: 'App',
  components: {
    UnderscoreComponent,
    MeetComponent
  },
  data() {
    return {
      isRecording: true,
      currEvents: [
        {
          kind: "speaker",
          old: "",
          name: "John Doe",
          new: "",
          document: "abc",
          date: 100,
        },
        {
          kind: "text",
          old: "",
          name: "",
          new: "Mispellings and grammatical errors can effect your credibility. ",
          document: "abc",
          date: 100,
        },
        {
          kind: "text",
          old: "",
          name: "",
          new: "The same goes for misused commas, and other types of punctuation . ",
          document: "abc",
          date: 100,
        },
        {
          kind: "text",
          old: "",
          name: "",
          new: "Not only will Grammarly underline these issues in red, it will also showed you how to correctly write the sentence.",
          document: "abc",
          date: 100,
        },
        {
          kind: "speaker",
          old: "",
          name: "Jane Doe",
          new: "",
          document: "abc",
          date: 100,
        },
        {
          kind: "text",
          old: "",
          name: "",
          new: "Underlines that are blue indicate that Grammarly has spotted a sentence that is unnecessarily wordy. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner",
          document: "abc",
          date: 100,
        }
      ]
    }
  },
  mounted() {
    // const k = this
    // setInterval(function () {
    //   k.currEvents.push({
    //     kind: "text",
    //     old: "",
    //     name: "",
    //     new: "Underlines that are blue indicate that Grammarly has spotted a sentence that is unnecessarily wordy. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner",
    //     document: "abc",
    //     date: 100,
    //   })
    // }, 5000);
  },
  setup() {
    const channel = new BroadcastChannel('gmeet-messages');
    channel.addEventListener ('message', (event) => {
      console.log(event.data);
    });
  }
}
</script>

<style>
body {
  background-color: #1b2228;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #8caec5;
}

.waiting-container{
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  top: 30%;
  left: 30%;
}

.w1 {
  font-size: 0.7em;
}
</style>
