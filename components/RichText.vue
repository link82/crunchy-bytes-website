<template>
  <div
    class="rich-text"
    v-html="resolvedText" />
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      content: VueTypes.object
    },
    computed: {
      resolvedText () {
        return this.content ? this.$storyapi.richTextResolver.render(this.content) : null
      }
    }
  }
</script>

<style lang="scss">
  .rich-text {
    > p {
      margin: 0;
    }
  }
</style>
