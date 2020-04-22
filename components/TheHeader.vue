<template>
  <header class="header">
    <logo class="header__logo" />
    <div class="header__burger" />
  </header>
</template>

<script>
  import Logo from '@/components/Logo'

  export default {
    components: {
      Logo
    }
  }
</script>

<style lang="scss">
  .header {
    display: flex;
    height: 100px;
    justify-content: space-between;
  }
  .header__logo {
    width: 200px;
  }
</style>
