<template>
  <link-wrapper
    :to="to"
    class="menu-item">
    <span class="menu-item__label">
      {{ label }}
    </span>
    <n-image
      v-if="image"
      :img="{ image }"
      :width="300"
      :height="300"
      class="menu-item__image" />
  </link-wrapper>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      to: VueTypes.object.isRequired,
      image: VueTypes.string,
      label: VueTypes.string
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;

    @include mq(lg) {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  .menu-item__label {
    margin-right: 50px;
    color: $color-background;
    font-size: 22px;
  }

  .menu-item__image {
    width: 90px;
    height: 90px;

    @include mq(lg) {
      width: 150px;
      height: 150px;
    }
  }
</style>
