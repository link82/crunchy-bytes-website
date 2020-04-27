<template functional>
  <div
    :style="`background-color: ${props.color}`"
    class="stripe" />
</template>

<style lang="scss">
  .stripe {
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: $color-primary;
    z-index: -1;

    @include mq($until: lg) {
      display: none;
    }
  }
</style>
