<template functional>
  <button
    class="hamburger u-text--hide"
    @click="listeners['click']">
    <span class="hamburger__line" />
  </button>
</template>

<style lang="scss">
  .hamburger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    padding: 5px;
  }

  .hamburger__line {
    position: relative;

    &,
    &::before,
    &::after {
      display: block;
      width: 28px;
      height: 3px;
      background-color: $color-text;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
    }

    &::before {
      top: -7px;
    }

    &::after {
      bottom: -7px;
    }
  }
</style>
