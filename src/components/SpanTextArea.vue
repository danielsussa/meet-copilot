<template>
  <span :contenteditable="!isActive" v-text="text" v-on:change="onInput">
  </span>
</template>

<script>
export default {
  name: "SpanTextArea",
  emits: ["textChange"],
  props: {
    text: String,
    isActive: Boolean,
    index: Number,
  },
  data() {
    return {
    }
  },
  methods: {
    onInput(e) {
      console.log("heree", e);
    },
  },
  mounted() {

    const k = this
    let observer = new MutationObserver(function(mutations){
        for (const mutation of mutations) {
          k.$emit('textChange', {
            text: mutation.target.textContent,
            index: k.index
          });
        }
    })

    observer.observe(this.$el, {
      subtree:       true,
      characterData: true,
      characterDataOldValue: true,
    });
  },
}
</script>

<style scoped>
span{
  font-family: monospace;
  font-size: 1.2em;
}
</style>