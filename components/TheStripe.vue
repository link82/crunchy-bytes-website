<template>
  <div
    :style="bgColor"
    :class="[
      'stripe',
      { 'stripe--s': small },
      { 'stripe--r': right }
    ]" />
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      color: VueTypes.string,
      small: VueTypes.bool.def(false),
      right: VueTypes.bool.def(false)
    },
    computed: {
      bgColor () {
        if (!this.color) { return null }
        return `background-color: ${this.color};`
      }
    }
  }
</script>

<style lang="scss">
  .stripe {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: $color-primary;
    z-index: -1;
    transition-property: transform, background-color;
    transition-duration: 750ms;
    transition-timing-function: ease;

    @include mq($until: lg) {
      display: none;
    }
  }

  .stripe--s {
    transform: translateX(-33.3333%)
  }

  .stripe--r {
    transform: translateX(calc(100vw - 100%));
  }

  .stripe--s.stripe--r {
    transform: translateX(calc(100vw - 66.6666%));
  }
</style>
