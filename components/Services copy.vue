<template>
  <section class="services">
    <div :style="wrapperSize">
      <div
        v-for="item in items"
        :key="item._uid"
        class="services__item">
        <n-image
          :img="item.image"
          class="services__img" />
        <div
          class="services__text"
          :style="bgColor(item)">
          <heading
            size="l"
            :rich-text="item.title" />
          <rich-text :content="item.description" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      items: VueTypes.array,
      index: VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.string
      ])
    },
    computed: {
      wrapperSize () {
        return `width: ${this.items.length * 100}%;`
      }
    },
    methods: {
      bgColor (item) {
        if (!item.color?.color) { return null }
        return `background-color: ${item.color.color};`
      }
    }
  }
</script>

<style lang="scss">
  .services {
    height: 100%;
    overflow: auto;

    > div {
      display: flex;
      height: 100%;
    }
  }

  .services__item {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @include mq(lg) {
      flex-direction: row-reverse;
      align-items: center;
      padding-left: 150px;
      padding-right: 150px;
      flex-wrap: wrap;
    }
  }

  .services__item--r {
    flex-direction: row;

    > .services__text {
      padding-left: 40px;
      padding-right: 0px
    }
  }

  .services__text,
  .services__img {
    @include mq(lg) {
      flex: 0 0 50%;
    }
  }

  .services__img {
    flex: 1 1 auto;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .services__text {
    flex: 0 0 40%;
    padding: 20px;
    font-weight: 300;
    min-height: 280px;
    color: $color-black;

    @include mq(lg) {
      padding: 0;
      padding-right: 40px;
      background-color: transparent !important;
    }

    > .heading {
      margin-bottom: 20px;
    }

    > .rich-text {
      margin-bottom: 30px;
    }
  }

</style>
