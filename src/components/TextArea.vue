<template>
  <textarea class="textarea" v-model="textData" v-on:scroll="resize">
  </textarea>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    text: String
  },
  data() {
    return {
      textData: this.text
    }
  },
  methods: {
    computeTextChange(index) {
      console.log(index)
    },
    resize(e) {
      console.log("resize!", e)
      e.target.style.height = "0px";
      e.target.style.height = (e.target.scrollHeight)+"px";
    },
  },
  updated() {
    console.log("opa")
  },
  mounted() {
    console.log(this.text)
    this.$el.style.height = this.$el.style.scrollHeight+'px'
    // console.log(this.$el.style)
  }
}
</script>

<style scoped>
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
</style>