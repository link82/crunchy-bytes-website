<template>
  <picture>
    <source
      :srcset="webpSource"
      type="image/webp">
    <img
      :src="img.image"
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
      full: VueTypes.bool.def(false)
    },
    computed: {
      path () {
        return this.img?.image?.split('a.storyblok.com')[1]
      },
      webpSource () {
        return `//img2.storyblok.com/filters:format(webp)${this.path}`
      }
    }
  }
</script>
