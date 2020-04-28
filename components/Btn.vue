<template>
  <component
    :is="tagName"
    :to="isRoute ? location : null"
    :type="type || null"
    :target="target || null"
    :href="location"
    :disabled="disabled"
    :role="role"
    :class="[
      'btn',
      { 'btn--full' : full }
    ]"
    @click="$emit('click', $event)"
    @click.native="$emit('click', $event)">
    <span class="btn__text">
      <slot />
    </span>
  </component>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    name: 'Btn',
    props: {
      link: VueTypes.oneOfType([
        VueTypes.string,
        VueTypes.object
      ]),
      type: VueTypes.string,
      disabled: VueTypes.bool.def(false),
      role: VueTypes.string,
      inline: VueTypes.bool.def(false),
      full: VueTypes.bool.def(false),
      target: VueTypes.string
    },
    computed: {
      isRoute () {
        return typeof this.link === 'object'
      },
      tagName () {
        return !!this.link ? (this.isRoute ? 'nuxt-link' : 'a') : 'button'
      },
      location () {
        return this.link ? (this.isRoute ? this.localePath(this.link) : this.link) : null
      }
    }
  }
</script>

<style lang="scss">
  .btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: 0;
    padding: 0px 50px;
    border-radius: 2px;
    white-space: nowrap;
    text-decoration: none;
    overflow: hidden;
    color: $color-light;
    cursor: pointer;
    background-color: $color-text;
    transition-property: background-color, opacity;
    transition-duration: $transition-timing;
    z-index: 0;

    // &:hover,
    // &:active,
    // &:focus {
    //   background-position: 100%;
    // }

    // &:active,
    // &:focus {
    //   box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, 0.25);
    // }

    &:disabled,
    &[disabled] {
      &, &:hover, &:focus {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

  .btn__text {
    display: block;
    font-size: 14px;
    line-height: 1;
    font-weight: 700;
    white-space: normal;
    text-align: center;
  }

  .btn--full {
    height: 60px;
    width: 100%;
  }

</style>
