<template>
  <address class="address-box">
    <div class="address-box__item">
      <span>{{ $t('address.email') }}</span>
      <a
        :href="`mailto:${address.email}`"
        target="_blank">
        {{ address.email }}
      </a>
    </div>
    <div class="address-box__row">
      <div class="address-box__item">
        <span>{{ $t('address.street') }}</span>
        <a
          :href="mapsLink"
          target="_blank">
          {{ streetAddress }}
        </a>
      </div>
      <div class="address-box__item">
        <span>{{ $t('address.phone') }}</span>
        <a
          :href="`tel://${address.phone}`">
          {{ address.phone }}
        </a>
      </div>
    </div>
  </address>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      address: VueTypes.object
    },
    computed: {
      streetAddress () {
        return `${this.address.street}, ${this.address.postal_code} ${this.address.town}`
      },
      mapsLink () {
        return `https://www.google.it/maps/@${this.address.latitude},${this.address.longitude},15z`
      }
    }
  }
</script>

<style lang="scss">
  .address-box {
    font-size: 20px;
  }

  .address-box__row {
    @include mq(lg) {
      display: flex;
      > * {
        flex: 0 0 50%;
      }
    }
  }

  .address-box__item {
    margin-bottom: 15px;

    > span {
      display: block;
      font-weight: 300;
      margin-bottom: 5px;
    }

    > a {
      display: block;
      font-weight: 700;
      color: $color-text;
    }
  }
</style>
