<template>
  <transition
    enter-class="cookie-bar-hidden"
    leave-to-class="cookie-bar-hidden"
    enter-active-class="cookie-bar-transition"
    leave-active-class="cookie-bar-transition">
    <div class="cookie-bar">
      <span>
        {{ $t('cookies.message') }}
      </span>
      <btn
        class="cookie-bar__btn"
        @click="handleAccept">
        {{ $t('ok') }}
      </btn>
    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      handleAccept () {
        this.$store.commit('setCookiesAccepted', true)
        this.$cookies.set('cookies-accepted', true)
      }
    }
  }
</script>

<style lang="scss">
  .cookie-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: $color-background;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .cookie-bar__btn {
      height: 100%;
    }

    > span {
      flex: 1 0 auto;
      padding: 0 35px;
    }
  }

  .cookie-bar-hidden {
    transform: translateY(100%);
    opacity: 0.6;
  }

  .cookie-bar-transition {
    transition-property: transform, opacity;
    transition-duration: $transition-timing;
    transition-timing-function: ease-in-out;
  }

</style>
