<template>
  <section class="service-block">
    <div class="service-block__text">
      <heading
        size="xl"
        light>
        {{ title }}
      </heading>
      <rich-text :content="description" />
    </div>
    <n-image
      :img="image"
      class="service-block__img" />
  </section>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      title: VueTypes.string,
      description: VueTypes.object,
      image: VueTypes.object
    }
  }
</script>

<style lang="scss">

</style>
