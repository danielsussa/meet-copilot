<template>
  <div class="waiting-container" v-if="!isRecording">
    <h1>Meet Wingman - <span class="w1">Waiting for some signal<UnderscoreComponent></UnderscoreComponent></span></h1>
    <h2></h2>
  </div>
  <MeetComponent v-if="isRecording" :captions="captions"></MeetComponent>
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
      captions: []
    }
  },
  mounted() {
    const k = this
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get(['example'], function(result){
      console.log(result.example.captions)
      k.captions = result.example.captions
    });
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
