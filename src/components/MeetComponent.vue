<template>
  <div id="meet">
    <h1>Meeting in progress: {{meetingName}}</h1>
    <p style="margin-top: -20px">Current time: {{meetingTime}}</p>

    <div id="meet-cc" contenteditable="true" autofocus>
      <div :class="{ odd: index%2 === 0 }" class="speach" v-for="(item, index) in meetData.captions" :key="index">
        <h2 contenteditable="false"><span class="time">{{date(item.unix)}}</span> {{item.speaker}}</h2>
        <div style="padding-left: 10px" >
          {{item.caption}}
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "MeetComponent",
  components: {},
  data() {
    return {
      captionsComputed: {
        captions: [],
        textChanges: [
          {
            operations: [
              {
                index: 0,
                initChar: 0,
                endChar: 12,
                operation: "remove"
              }
            ]
          }
        ]
      },

    }
  },
  props: {
    meetData:    Object,
    meetingName: String,
    meetingTime: String
  },
  methods: {
    date(ts) {
      return new Date(ts).toLocaleTimeString('en', {hour: "2-digit", minute: "2-digit"})
    },
    processText(text, textChange) {
      console.log(textChange)
      return text
    }
  },
  mounted() {
    const k = this
    let observer = new MutationObserver(function(mutations) {
      k.textChanges[0].operations.push({
        index: 0,
        initChar: 0,
        endChar: 12,
        operation: "remove"
      })
      console.log(mutations)
      console.log(k.textChanges[0].operations.length)
    })
    observer.observe(document.getElementById("meet-cc"), {
      subtree:       true,
      characterData: true,
      characterDataOldValue: true
    });
  },
  computed: {

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