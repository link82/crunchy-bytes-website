<template>
  <picture>
    <source
      :srcset="webpSource"
      type="image/webp">
    <img
      :src="source"
      :alt="img.image_alt"
      :title="img.caption"
      class="image">
  </picture>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      img: VueTypes.object,
      width: VueTypes.number.def(0),
      height: VueTypes.number.def(0),
      full: VueTypes.bool.def(false)
    },
    computed: {
      path () {
        return this.img?.image?.split('a.storyblok.com')[1]
      },
      size () {
        if (this.width !== 0 || this.height !== 0) {
          return `/${this.width}x${this.height}`
        }
        return ''
      },
      source () {
        return `//img2.storyblok.com${this.size}${this.path}`
      },
      webpSource () {
        return `//img2.storyblok.com${this.size}/filters:format(webp)${this.path}`
      }
    }
  }
</script>
