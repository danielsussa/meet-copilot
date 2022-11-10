<template>
  <div id="meet">
    <h1>Meeting in progress: {{meetingName}}</h1>
    <p style="margin-top: -20px">Current time: {{meetingTime}}</p>

    <div id="meet-cc" contenteditable="true" autofocus>
      <div :class="{ odd: index%2 === 0 }" class="speach" v-for="(item, index) in transform" :key="index">
        <h2 contenteditable="false"><span class="time">{{item.time}}</span> {{item.speaker}}</h2>
        <div style="padding-left: 10px" >
          {{standardText(item)}}
        </div>
      </div>
    </div>

    <UnderscoreComponent></UnderscoreComponent>
  </div>
</template>

<script>
import UnderscoreComponent from "@/components/UnderscoreComponent";
export default {
  name: "MeetComponent",
  components: {UnderscoreComponent},
  data() {
    return {
    }
  },
  props: {
    events: Array,
    meetingName: String,
    meetingTime: String
  },
  methods: {
    standardText(speech) {
      let fullText = ''
      for (const text of speech.texts) {
        fullText += text
      }
      return fullText
    }
  },
  mounted() {
    let observer = new MutationObserver(function(mutations) {
      console.log(mutations)
    })
    observer.observe(document.getElementById("meet-cc"), {
      subtree:       true,
      characterData: true,
      characterDataOldValue: true
    });
  },
  computed: {
    transform() {

      const speeches = []
      for (const event of this.events) {
        const date = new Date(event.date)
        if (event.kind === 'speaker') {
          speeches.push({
            speaker: event.name,
            time:    date.toLocaleTimeString('en', {hour: "2-digit", minute: "2-digit"}),
            texts: []
          })
        }
        if (event.kind === 'text') {
          if (speeches.length === 0) {
            continue
          }
          if (event.old != null) {
            const idx = speeches[speeches.length-1].texts.lastIndexOf(event.old)
            if (idx >= 0) {
              speeches[speeches.length-1].texts[idx] = event.new
            }else {
              speeches[speeches.length-1].texts.push(event.new)
            }
          }else {
            speeches[speeches.length-1].texts.push(event.new)
          }
        }
      }
      return speeches
    },
  }
}
</script>

<style scoped>
#meet{
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
  padding-bottom: 15px;
  padding-top: 1px;
  padding-left: 10px;
}
.odd{
  background-color: #1e282d;
}
:focus-within {
  outline: none;
}
</style>