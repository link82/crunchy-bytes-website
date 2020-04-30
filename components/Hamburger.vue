<template functional>
  <button
    class="hamburger u-text--hide"
    :class="[
      data.class,
      data.staticClass,
      { 'hamburger--close': props.close },
      { 'hamburger--light': props.light }
    ]"
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

  .hamburger--light {
    .hamburger__line {
      &,
      &::before,
      &::after {
        background-color: $color-background;
      }
    }
  }

  .hamburger--close {
    .hamburger__line {
      background-color: transparent;
      &::before {
        animation: openBefore 350ms forwards;
        // transform: translateY(7px) rotate(45deg)
      }
      &::after {
        animation: openAfter 350ms forwards;
        // transform: translateY(-7px) rotate(-45deg)
      }
    }
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
      transition-property: background-color, transform;
      transition-duration: $transition-timing;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      transform-origin: center;
    }

    &::before {
      top: -7px;
      animation: closeBefore 350ms forwards;
    }

    &::after {
      bottom: -7px;
      animation: closeAfter 350ms forwards;
    }
  }

  @keyframes openBefore {
    0% {
      transform: none;
    }
    50% {
      transform: translateY(7px);
    }
    100% {
      transform: translateY(7px) rotate(45deg);
    }
  }

  @keyframes openAfter {
    0% {
      transform: none;
    }
    50% {
      transform: translateY(-7px);
    }
    100% {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  @keyframes closeBefore {
    0% {
      transform: translateY(7px) rotate(45deg);
    }
    50% {
      transform: translateY(7px);
    }
    100% {
      transform: none;
    }
  }

  @keyframes closeAfter {
    0% {
      transform: translateY(-7px) rotate(-45deg);
    }
    50% {
      transform: translateY(-7px);
    }
    100% {
      transform: none;
    }
  }
</style>
