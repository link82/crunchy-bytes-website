<template>
  <main class="main-content">
    <the-header />
    <nuxt />
    <the-menu v-show="isMenuOpen" />
    <the-stripe />
    <the-footer />
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import TheHeader from '@/components/TheHeader'
  import TheFooter from '@/components/TheFooter'
  import TheMenu from '@/components/TheMenu'
  import TheStripe from '@/components/TheStripe'

  export default {
    components: {
      TheMenu,
      TheStripe,
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
