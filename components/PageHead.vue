<template>
  <div class="page-head">
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
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 0;
  }

  .page-head__content {
    width: 50%;
    padding-left: 50px;
    padding-right: 50px;
    color: $color-background;
  }

  .page-head__abstract {
    width: 60%;
  }

  .page-head__img {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    z-index: -1;
    top: 50%;
    transform: translateY(-50%);
  }

  .page-head__links {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60%;
    display: flex;
  }
</style>
