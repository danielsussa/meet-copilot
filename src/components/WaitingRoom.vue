<template>
  <h1>Waiting room</h1>


  <div class="meetings-container">
    <div v-for="(item, index) in list" :key="index">
      <div class="meeting-container" v-on:click="goToRoom(item.link)">
        <div class="meeting-data">
          <div class="meeting-date">
            <p>{{item.date}}</p>
          </div>
          <div class="meeting-name">
            <p>{{item.meetName}}</p>
          </div>
        </div>
        <div class="meeting-status">
          <p>{{item.status}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "WaitingRoom",
  data() {
    return {
      list: {}
    }
  },
  methods: {
    goToRoom(link){
      this.$router.push(`/rooms/${link}`)
    }
  },
  mounted() {
    const k = this
    const port = chrome.runtime.connect("blmfpfmkiciicfjapejajifcljjnjcai",{name: 'dashboard'});
    port.postMessage({kind: "list"});
    port.onMessage.addListener(function(message) {
      if (message.kind === 'list') {
        k.list = message.data.list
      }
    })
  }
}
</script>

<style scoped lang="scss">

h1{
  text-align: center;
}

.meetings-container{
  display: block;
  margin: 5px;
}
.meeting-data{
  display: flex;

  .meeting-date{
    margin-right: 15px;
  }
}


.meeting-container{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  min-height: 40px;
  border: var(--container-border) 1px solid;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

</style>