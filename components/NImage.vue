<template>
  <picture v-if="webp">
    <source
      :srcset="webpSource"
      type="image/webp">
    <img
      :src="img.image"
      :alt="img.image_alt"
      :title="img.caption">
  </picture>
  <img
    v-else
    :src="img.image"
    :alt="img.image_alt"
    :title="img.caption">
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      img: VueTypes.object,
      webp: VueTypes.bool.def(true)
    },
    computed: {
      path () {
        return this.img.image.split('a.storyblok.com')[1]
      },
      webpSource () {
        return `//img2.storyblok.com/filters:format(webp)${this.path}`
      }
    }
  }
</script>
