<template>
  <div id="meeting-room">
<!--    <h1>Meeting in progress: {{meetingName}}</h1>-->
<!--    <p style="margin-top: -20px">Current time: {{meetingTime}}</p>-->

<!--    <div id="meet-cc" contenteditable="true" autofocus>-->
<!--      <div :class="{ odd: index%2 === 0 }" class="speach" v-for="(item, index) in captionsComputed.captions" :key="index">-->
<!--        <h2 contenteditable="false"><span class="time">{{date(item.unix)}}</span> {{item.speaker}}</h2>-->
<!--          <span tabindex="0" @keydown="computeTextChange" style="padding-left: 10px" >-->
<!--            {{item.caption}}-->
<!--          </span>-->
<!--      </div>-->

    <div id="meet-cc" >
      <div :class="{ odd: index%2 === 0 }" class="speach" v-for="(item, index) in captionsComputed.captions" :key="index">
        <h2 contenteditable="false"><span class="time">{{date(item.unix)}}</span> {{item.speaker}}</h2>
        <textarea v-model="item.caption" v-on:scroll="resize" v-on:input="computeTextChange(index)" :autofocus="item.length-1 === index">
        </textarea>
      </div>
    </div>

    <div id="last-div"></div>


  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: "MeetingRoom",
  data() {
    return {
      captionsComputed: {
        captions: [],
      },
    }
  },
  methods: {
    computeTextChange(index) {
      console.log(index)
    },
    resize(e) {
      e.target.style.height = "0px";
      e.target.style.height = (e.target.scrollHeight)+"px";
    },
    date(ts) {
      return new Date(ts).toLocaleTimeString('en', {hour: "2-digit", minute: "2-digit"})
    },
  },
  mounted() {
    const k = this

    const port = chrome.runtime.connect("blmfpfmkiciicfjapejajifcljjnjcai",{name: 'dashboard'});
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
.waiting{
  text-align: center;
}
.speach{
  padding-top: 1px;
  padding-left: 10px;
}
.odd{
  background-color: var(--background-odd);
}
:focus-within {
  outline: none;
}
textarea{
  width:100%;
  font-size: 1.2em;
  background-color: transparent;
  color: var(--text-primary);
  border: transparent;
  resize: none;
  overflow: hidden;
  outline:none;
}

.scrollable {
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 20px);
}
</style>