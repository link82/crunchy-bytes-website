<template>
  <component
    :is="tagname"
    class="heading"
    :class="[
      `heading--${size}`
    ]">
    <span
      v-if="rich"
      v-html="rich" />
    <slot v-else />
  </component>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      tag: VueTypes.string,
      size: VueTypes.oneOf([ 'xl', 'l', 'm', 's', 'xs' ]).def('m'),
      richText: VueTypes.object
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
    },
    created () {
      if (Object.keys(this.richText).length === 0) {
        this.rich = null
      } else {
        this.rich = this.$storyapi.richTextResolver.render(this.richText).replace(/^<p[^>]*>|<\/p>$/g, '')
      }
    }
  }
</script>

<style lang="scss">
  .heading {
    position: relative;
    margin: 0;
    line-height: 1.2725;
    font-weight: 300;
    color: currentColor;
  }

  .heading--xl {
    font-size: 42px;

    @include mq(lg) {
      font-size: 64px;
    }
  }

  .heading--l {
    font-size: 36px;

    @include mq(lg) {
      font-size: 60px;
    }
  }

  .heading--m {
    font-size: 26px;

    @include mq(lg) {
      font-size: 36px;
    }
  }

  .heading--s {
    font-size: 20px;

    @include mq(lg) {
      font-size: 24px;
    }
  }

  .heading--xs {
    font-size: 18px;

    @include mq(lg) {
      font-size: 22px;
    }
  }
</style>
