<template>
  <link-wrapper
    :to="link"
    :title="title"
    class="quick-link"
    :class="{ 'quick-link--light': light }">
    <heading
      size="s"
      class="quick-link__title">
      {{ title }}
    </heading>
    <p class="quick-link__abstract">
      {{ abstract }}
    </p>
    <arrow />
  </link-wrapper>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      title: VueTypes.string,
      abstract: VueTypes.string,
      link: VueTypes.object.isRequired,
      light: VueTypes.bool.def(false)
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
