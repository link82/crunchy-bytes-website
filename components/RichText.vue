<template>
  <div v-html="resolvedText" />
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
