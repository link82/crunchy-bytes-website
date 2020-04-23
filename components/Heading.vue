<template>
  <component
    :is="tagname"
    class="heading"
    :class="[
      `heading--${size}`,
      { 'heading--light': light }
    ]">
    <slot />
  </component>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      tag: VueTypes.string,
      size: VueTypes.oneOf([ 'xl', 'l', 'm', 's', 'xs' ]).def('m'),
      light: VueTypes.bool.def(false)
    },
    computed: {
      /* eslint-ignore */
      tagname () {
        if (this.tag) { return this.tag }
        switch (this.size) {
          case 'xl':
            return 'h1'
          case 'l':
            return 'h2'
          case 's':
            return 'h4'
          case 'xs':
            return 'h5'
          case 'm':
          default:
            return 'h3'
        }
      }
    }
  }
</script>

<style lang="scss">
  .heading {
    position: relative;
    margin: 0;
    line-height: 1.4725;
    font-weight: bold;
  }

  .heading--light {
    color: $color-background;
  }

  .heading--xl {
    font-size: 64px;
  }

  .heading--l {
    font-size: 60px;
  }

  .heading--m {
    font-size: 52px;
  }

  .heading--s {
    font-size: 48px;
  }

  .heading--xs {
    font-size: 40px;
  }
</style>
