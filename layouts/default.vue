<template>
  <main class="main-content">
    <the-header />
    <nuxt />
    <the-menu v-show="isMenuOpen" />
    <the-footer />
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import TheHeader from '@/components/TheHeader'
  import TheFooter from '@/components/TheFooter'
  import TheMenu from '@/components/TheMenu'

  export default {
    components: {
      TheMenu,
      TheHeader,
      TheFooter
    },
    computed: {
      ...mapState([
        'isMenuOpen'
      ])
    }
  }
</script>
