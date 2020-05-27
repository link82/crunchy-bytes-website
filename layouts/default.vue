<template>
  <main class="main-content">
    <the-header />
    <nuxt />
    <the-menu v-show="isMenuOpen" />
    <the-stripe
      :color="stripeColor"
      :small="stripeSmall"
      :right="stripeRight" />
    <cookie-bar v-if="!cookiesAccepted" />
    <the-footer />
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import TheHeader from '@/components/TheHeader'
  import TheFooter from '@/components/TheFooter'
  import TheMenu from '@/components/TheMenu'
  import TheStripe from '@/components/TheStripe'
  import CookieBar from '@/components/CookieBar'

  export default {
    components: {
      TheMenu,
      TheStripe,
      TheHeader,
      CookieBar,
      TheFooter
    },
    computed: {
      ...mapState([
        'isMenuOpen',
        'stripeSmall',
        'stripeRight',
        'stripeColor',
        'cookiesAccepted'
      ])
    }
  }
</script>
