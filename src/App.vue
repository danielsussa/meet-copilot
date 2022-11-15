<template>
  <router-view></router-view>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: 'App',
  components: {
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
  }
}
</script>

<style>

* {
  /*─────────Original Obsidian Variables──────────*/
  --background-primary: hsl(200, 14%, 15%);
  --background-odd: hsl(200, 18%, 18%);
  --text-primary: hsl(200, 20%, 50%);
  --container-border: hsl(200, 25%, 25%);

  --background-red: hsl(358, 36%, 37%);
}

body {
  overflow: auto;
  background-color: var(--background-primary);
  margin: 0;
  scroll-behavior: smooth;
  height: 100%
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
  color: var(--text-primary);
}


</style>
