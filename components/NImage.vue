<template>
  <div class="image">
    <div class="image__wrapper">
      <picture>
        <source
          :srcset="webpSource"
          type="image/webp">
        <img
          :src="source"
          :alt="img.image_alt"
          :title="img.caption">
      </picture>
      <div
        data-anim-stripe-from
        class="image__stripe" />
      <div
        data-anim-stripe-to
        class="image__stripe" />
    </div>
  </div>
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

<style lang="scss">
  .image__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .image__stripe {
    position: absolute;
    top: 0;
    right: -1px;
    width: 100%;
    height: 100%;
    background-color: $color-primary;
    transform: translateX(100%);

    &[data-anim-stripe-to] {
      background-color: $color-purple;
    }
  }

  .image__stripe--half[data-anim-stripe-from] {
    transform: translateX(0);
  }

</style>
