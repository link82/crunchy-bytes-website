<template>
  <header class="header l-container">
    <nuxt-link
      :to="localePath({ name: 'index' })">
      <logo
        :light="logoLight"
        :small="logoSmall"
        class="header__logo" />
    </nuxt-link>
    <hamburger
      :light="isMenuOpen"
      class="header__burger"
      @click="toggleMenu" />
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import Logo from '@/components/Logo'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Logo,
      Hamburger
    },
    computed: {
      ...mapState([
        'isMenuOpen',
        'logoLight',
        'logoSmall'
      ])
    },
    methods: {
      toggleMenu () {
        this.$store.commit('setMenuOpen', !this.isMenuOpen)
      }
    }
  }
</script>

<style lang="scss">
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $color-text;
    z-index: 1;

    @include mq($until: lg) {
      height: $header-height-mobile;
      background-color: $color-green;
    }
  }

  .header--light {
    color: $color-background;
  }

  .header__logo {
    width: 200px;
  }

</style>
