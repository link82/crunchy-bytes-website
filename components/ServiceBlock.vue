<template>
  <section
    class="service-block"
    :class="{ 'service-block--r': isOdd }">
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
      image: VueTypes.object,
      index: VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.string
      ])
    },
    computed: {
      isOdd () {
        return this.index % 2 !== 0
      }
    }
  }
</script>

<style lang="scss">
  .service-block {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 150px;
    padding-right: 150px;
  }

  .service-block--r {
    flex-direction: row-reverse;
  }

  .service-block__text,
  .service-block__img {
    flex: 0 0 50%;
  }

</style>
