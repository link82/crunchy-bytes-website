<template>
  <header class="header l-container">
    <logo
      :light="logoLight"
      :small="logoSmall"
      class="header__logo" />
    <hamburger
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
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
  }

  .header__logo {
    width: 200px;
  }

</style>
