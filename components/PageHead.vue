<template>
  <div
    :class="{ 'page-head--home': home }"
    class="page-head">
    <div class="page-head__wrapper">
      <div class="page-head__content">
        <slot name="content" />
      </div>
      <n-image
        :img="image"
        class="page-head__img" />
    </div>
    <the-socials v-if="home" />
    <aside
      v-if="boxes"
      class="page-head__links">
      <side-box
        v-for="(l, i) in boxes"
        :key="l._uid"
        :title="l.title"
        :big-title="l.bigTitle"
        :abstract="l.abstract"
        :link="l.link"
        :light="i % 2 !== 0" />
      <slot name="boxes" />
    </aside>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import TheSocials from '@/components/TheSocials'
  import SideBox from '@/components/SideBox'

  export default {
    components: {
      TheSocials,
      SideBox
    },
    props: {
      image: VueTypes.object,
      boxes: VueTypes.array,
      home: VueTypes.bool.def(false)
    }
  }
</script>

<style lang="scss">
  .page-head {
    position: relative;
    margin-top: $header-height-mobile;
    height: calc(100% - #{$header-height-mobile});
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 0;

    @include mq(lg) {
      height: 100%;
      margin-top: 0;
      flex-direction: row;
      justify-content: initial;
      align-items: center;
    }
  }

  .page-head__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 0;
    flex: 1;
  }

  .page-head__content {
    width: 50%;
    padding-left: 50px;
    padding-right: 50px;
    color: $color-background;

    @include mq($until: lg) {
      position: absolute;
      left: 0;
      top: 50%;
      width: 80%;
      padding: 20px;
      background-color: rgba($color-primary, 0.7);
      transform: translateY(-50%);
    }
  }

  .page-head__img {
    width: 100%;
    height: 100%;
    z-index: -1;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include mq(lg) {
      position: absolute;
      width: 66.6666%;
      height: 650px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .page-head__links {
    display: flex;
    justify-content: flex-end;

    > * {
      flex: 0 0 50%;
    }

    @include mq(lg) {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60%;
    }
  }
</style>
