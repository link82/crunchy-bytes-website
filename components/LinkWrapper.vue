<template>
  <component
    :is="linkType"
    v-bind="propz">
    <slot />
  </component>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      to: VueTypes.object.isRequired,
      target: VueTypes.string,
      title: VueTypes.string
    },
    computed: {
      destination () {
        return this.$getLinkDestination(this.to)
      },
      internal () {
        return this.to.linktype === 'story'
      },
      linkType () {
        return this.internal ? 'nuxt-link' : 'a'
      },
      propz () {
        const p = {}
        if (this.internal) {
          p.to = this.destination
        } else {
          p.href = this.destination
        }
        p.target = this.target
        p.title = this.title
        return p
      }
    }
  }
</script>

<style>

</style>
