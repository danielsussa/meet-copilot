<template>
  <div class="waiting-container" v-if="!isRecording">
    <h1>Meet Copilot<p class="w1">Waiting for some signal<UnderscoreComponent></UnderscoreComponent></p></h1>
    <h2></h2>
  </div>
  <MeetComponent v-if="isRecording" :meetData="meetData"></MeetComponent>
</template>

<script>
/* eslint-disable no-undef */
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
      extensionId:"bkofmjmbnifeaijjiibmplifjaipnali",
      isRecording: false,
      meetData: {
        captions: []
      }
    }
  },
  mounted() {
    const k = this
    const port = chrome.runtime.connect(this.extensionId,{name: this.getMeetUrl()});
    port.postMessage({kind: "load"});
    port.onMessage.addListener(function(message) {
      console.log(message)
      if (message.kind === 'transmit' && message.data !== null) {
        k.meetData = message.data
        k.isRecording = true
      }
    })
  },
  methods: {
    getMeetUrl() {
      const urlSpl = document.URL.replace(/\/+$/, '').split("/")
      return urlSpl[urlSpl.length-1]
    }
  },
  processGmeetEvent(data) {
    const date = new Date(data.date)
    if (data.kind === 'speaker') {

      this.captions.push({
        speaker: data.name,
        time:    date.toLocaleTimeString('en', {hour: "2-digit", minute: "2-digit"}),
        texts: []
      })
    }
    if (data.kind === 'text') {
      if (this.captions.length === 0) {
        return
      }
      if (data.old != null) {
        const idx = this.captions[this.captions.length-1].texts.lastIndexOf(data.old)
        if (idx >= 0) {
          this.captions[this.captions.length-1].texts[idx] = data.new
        }else {
          this.captions[this.captions.length-1].texts.push(data.new)
        }
      }else {
        this.captions[this.captions.length-1].texts.push(data.new)
      }
    }
  }
}
</script>

<style>
body {
  background-color: #1b2228;
  margin: 0;
}
h1 {
  font-size: 2.5em; /* 40px/16=2.5em */
}

h2 {
  font-size: 1.875em; /* 30px/16=1.875em */
}

p {
  font-size: 1em; /* 14px/16=0.875em */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #8caec5;
}

.waiting-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
}

.w1 {
  font-size: 0.7em;
}
</style>
