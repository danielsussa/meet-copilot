<template>
  <div id="meeting-room">
    <div id="meet-cc" contenteditable="true" autofocus>
      <div :class="{ odd: index%2 === 0 }" class="speach" v-for="(item, index) in captionsComputed.captions" :key="index">
        <h2 contenteditable="false"><span class="time">{{date(item.unix)}}</span> {{item.speaker}}</h2>
<!--        <TextArea :text="item.caption"></TextArea>-->
        <SpanTextArea :is-active="captionsComputed.status !== 'stopped'" class="text-area" :text="item.caption"></SpanTextArea>
      </div>
    </div>

    <div id="last-div"></div>


  </div>
</template>

<script>
/* eslint-disable no-undef */
import SpanTextArea from "@/components/SpanTextArea";
export default {
  name: "MeetingRoom",
  components: {SpanTextArea},
  data() {
    return {
      captionsComputed: {
        captions: [],
      },
    }
  },
  methods: {
    date(ts) {
      return new Date(ts).toLocaleTimeString('en', {hour: "2-digit", minute: "2-digit"})
    },
  },
  updated() {
    window.scrollTo(0, document.body.scrollHeight);
  },
  mounted() {
    // https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
    const k = this

    const port = chrome.runtime.connect("bkofmjmbnifeaijjiibmplifjaipnali",{name: 'dashboard'});
    port.postMessage({kind: "load", room: this.$route.params.room});
    port.onMessage.addListener(function(message) {
      if (message.kind === 'transmit' && (message.data !== null && message.data !== undefined)) {
        k.captionsComputed = message.data
        k.isRecording = true
      }
    })
  }
}

</script>

<style scoped>
#meeting-room{
  padding: 10px;
}
.time {
  font-size: 16px;
  color: #314856;
}
.speach{
  padding-top: 1px;
  padding-left: 10px;
  padding-bottom: 20px;
}
.odd{
  background-color: var(--background-odd);
}
:focus-within {
  outline: none;
}

.scrollable {
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 20px);
}
.text-area{
  margin-bottom: 20px;
}
</style>