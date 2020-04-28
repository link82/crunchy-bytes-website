<template>
  <section
    class="service-block"
    :class="{ 'service-block--r': isOdd }">
    <div class="service-block__text">
      <heading
        size="l"
        :rich-text="title" />
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
      title: VueTypes.object,
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

    @include mq($until: lg) {
      padding-left: 20px;
      padding-right: 20px;
      flex-wrap: wrap;
    }
  }
  .service-block--r {
    flex-direction: row-reverse;

    > .service-block__text {
      padding-left: 40px;
      padding-right: 0px
    }
  }

  .service-block__text,
  .service-block__img {
    flex: 0 0 50%;
  }

  .service-block__text {
    color: $color-black;
    font-weight: 300;
    padding-right: 40px
  }

</style>
