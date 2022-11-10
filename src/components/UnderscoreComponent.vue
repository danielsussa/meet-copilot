<template>
  <span class='console-underscore' id='console' v-if="underscoreVisible">&#95;</span>
</template>

<script>
export default {
  name: "UnderscoreComponent",
  props: {
    currentText: String,
  },
  data() {
    return {
      underscoreVisible: false,
    }
  },
  methods:{
    startTextCursorInterval: function () {
      const k = this
      setInterval(function () {
        k.underscoreVisible = !k.underscoreVisible
      }, 500);
    }
  },
  mounted () {
    this.startTextCursorInterval()
  }
}
</script>

<style scoped>

.console-underscore {
  display:inline-block;
  position:relative;
  top:-0.14em;
  left:10px;
}
</style>