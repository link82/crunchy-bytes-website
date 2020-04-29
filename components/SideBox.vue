<template>
  <component
    :is="type"
    :to="destination"
    class="quick-link"
    :class="{ 'quick-link--light': light }">
    <slot>
      <heading
        :size="titleSize"
        class="quick-link__title"
        :rich-text="title" />
      <rich-text
        :content="abstract"
        class="quick-link__abstract" />
    </slot>
    <arrow v-if="link.id" />
  </component>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      title: VueTypes.object,
      abstract: VueTypes.object,
      bigTitle: VueTypes.bool.def(false),
      link: VueTypes.object,
      light: VueTypes.bool.def(false)
    },
    computed: {
      type () {
        return !!this.link && !!this.link.id ? 'link-wrapper' : 'div'
      },
      destination () {
        return (Object.keys(this.link).length !== 0 && this.link?.id) ? this.link : null
      },
      titleSize () {
        return this.bigTitle ? 'm' : 's'
      }
    }
  }
</script>

<style lang="scss">
  .quick-link {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
    background-color: $color-green;
    color: $color-background;

    @include mq($until: lg) {
      justify-content: space-between;
    }
  }

  .quick-link--light {
    background-color: $color-background;
    color: $color-text;
  }

  .quick-link__title {
    margin-bottom: 20px;
  }

  .quick-link__abstract {
    margin: 0;
    margin-bottom: 20px;
    font-weight: 300;

    @include mq($until: lg) {
      display: none;
    }
  }
</style>
