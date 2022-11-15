<template>
  <div id="meeting-room">

    <div id="meeting-room-container">

      <div id="meet-cc" contenteditable="true" autofocus>
        <div :class="{ odd: index%2 === 0 }" class="speach" v-for="(item, index) in captionsComputed.captions" :key="index">
          <span class="speakerContainer" contenteditable="false"><span class="time">{{date(item.unix)}}</span> {{item.speaker}}</span>
          <SpanTextArea @textChange="textChange" :index="index" :is-active="captionsComputed.status !== 'stopped'" class="text-area" :text="item.caption"></SpanTextArea>
        </div>
      </div>

      <div id="last-div"></div>

    </div>



    <div class="footer">
      <div class="footerLeft">
        <span class="footer-item" :class="{footerDeactivated: !this.hasPendingSave}">save <b>(ctrl+s)</b></span>
      </div>
      <div class="footerRight">
        <span class="footer-item">stopped<span class="footer-status"></span></span>
      </div>

    </div>

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
      hasPendingSave: false,
      captionsComputed: {
        captions: [],
      },
    }
  },
  methods: {
    textChange(msg){
      this.hasPendingSave = true
      this.captionsComputed.captions[msg.index].caption = msg.text
    },
    keyDown(e) {

      if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        this.port.postMessage({kind: "save", room: this.$route.params.room, data: this.captionsComputed});
        this.hasPendingSave = false
        e.preventDefault()
      }
      if (e.key.toLowerCase() === 'b' && e.ctrlKey) {
        e.preventDefault()
        this.$router.push(`/`)
      }
    },
    date(ts) {
      return new Date(ts).toLocaleTimeString('en', {hour: "2-digit", minute: "2-digit"})
    },
  },
  updated() {
    window.scrollTo(0, document.body.scrollHeight);
  },
  mounted() {
    const k = this

    this.port.postMessage({kind: "load", room: this.$route.params.room});
    this.emitter.on("chrome-port-transmit", msg => {
      k.captionsComputed = msg.data
      k.isRecording = true
    });

    this.emitter.on("keydown", e => {
      if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        this.port.postMessage({kind: "save", room: this.$route.params.room, data: this.captionsComputed});
        this.hasPendingSave = false
        e.preventDefault()
      }
      if (e.key.toLowerCase() === 'b' && e.ctrlKey) {
        this.$router.push(`/`)
        e.preventDefault()
      }
    });
  },
  beforeUnmount() {
    this.emitter.all.clear()
  }
}

</script>

<style scoped lang="scss">
#meeting-room-container{
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
.speakerContainer{
  margin-right: 10px;
  text-decoration: underline;
}
.footer{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  background-color: var(--background-odd);
  position: absolute;
  bottom: 0;
}
.footer-item{
  font-size: 0.8em;
  margin: 15px;
}
.footerDeactivated {
  opacity: 0.4;
}
.footer-status{
  background-color: var(--background-red);
  padding-right: 10px;
  margin-left: 5px;
  border-radius: 10px;
}
</style>