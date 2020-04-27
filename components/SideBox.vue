<template>
  <component
    :is="type"
    :to="link"
    class="quick-link"
    :class="{ 'quick-link--light': light }">
    <heading
      size="s"
      class="quick-link__title">
      {{ title }}
    </heading>
    <rich-text
      :content="abstract"
      class="quick-link__abstract" />
    <arrow v-if="link.id" />
  </component>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      title: VueTypes.string,
      abstract: VueTypes.object,
      link: VueTypes.object,
      light: VueTypes.bool.def(false)
    },
    computed: {
      type () {
        return !!this.link && !!this.link.id ? 'link-wrapper' : 'div'
      }
    }
  }
</script>

<style lang="scss">
  .quick-link {
    padding: 30px;
    background-color: $color-green;
    color: $color-background;
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
