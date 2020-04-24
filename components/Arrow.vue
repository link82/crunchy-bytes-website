<template functional>
  <span class="arrow">
    <span />
  </span>
</template>

<style lang="scss">
  .arrow {
    display: inline-block;
    position: relative;

    > span,
    &::before,
    &::after {
      height: 2px;
      border-radius: 2px;
      background-color: currentColor;
      transition: transform $transition-timing ease;
    }

    > span {
      display: block;
      width: 60px;
      transform-origin: center left;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 1px;
      width: 5px;
      transform-origin: center right;
    }

    &::before {
      transform: rotate(-45deg)
    }

    &::after {
      transform: rotate(45deg)
    }

    *:hover > & {
      > span {
        transform: scaleX(1.25);
      }
      &::before {
        transform: translateX(15px) rotate(-45deg)
      }

      &::after {
        transform: translateX(15px) rotate(45deg)
      }
    }
  }
</style>
