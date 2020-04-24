<template>
  <div class="page-head">
    <div class="page-head__wrapper">
      <div class="page-head__content">
        <heading size="xl">
          {{ title }}
        </heading>
        <rich-text
          :content="abstract"
          class="page-head__abstract" />
      </div>
      <n-image
        :img="image"
        class="page-head__img" />
    </div>
    <the-socials />
    <aside
      v-if="quickLinks"
      class="page-head__links">
      <quick-link
        v-for="(l, i) in quickLinks"
        :key="l._uid"
        :title="l.title"
        :abstract="l.abstract"
        :link="l.link"
        :light="i % 2 !== 0" />
    </aside>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import TheSocials from '@/components/TheSocials'
  import QuickLink from '@/components/QuickLink'

  export default {
    components: {
      TheSocials,
      QuickLink
    },
    props: {
      title: VueTypes.string,
      abstract: VueTypes.object,
      image: VueTypes.object,
      quickLinks: VueTypes.array
    }
  }
</script>

<style lang="scss">
  .page-head {
    position: relative;
    margin-top: $header-height-mobile;
    height: calc(100% - $header-height-mobile);
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

  .page-head__abstract {
    width: 60%;

    @include mq($until: lg) {
      display: none;
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
      width: 70%;
      height: auto;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .page-head__links {
    display: flex;

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
