<template>
  <validation-observer
    :id="id"
    ref="observer"
    v-slot="{ valid, pending }"
    tag="form"
    novalidate
    :autocomplete="autocomplete"
    @submit.prevent="submitHandler()">
    <slot
      :pending="pending"
      :valid="valid" />
    <recaptcha
      v-if="recaptcha"
      ref="captcha"
      @verify="handleVerification" />
  </validation-observer>
</template>

<script>
  import VueTypes from 'vue-types'
  import { ValidationObserver } from 'vee-validate'
  import Recaptcha from '@/components/form/Recaptcha'

  export default {
    components: {
      ValidationObserver,
      Recaptcha
    },
    props: {
      id: VueTypes.string.isRequired,
      recaptcha: VueTypes.bool.def(false),
      autocomplete: VueTypes.oneOfType([
        VueTypes.bool,
        VueTypes.string
      ]).def(true)
    },
    methods: {
      async submitHandler () {
        const isValid = await this.$refs.observer.validate()
        if (isValid) {
          if (this.recaptcha) {
            this.$refs.captcha.exec()
          } else {
            this.$emit('submit')
          }
        } else {
          console.warn(this.$t('validations.error'))
          if (this.recaptcha) {
            this.$refs.captcha.reset()
          }
          this.$emit('validation-error')
        }
      },
      handleVerification (response) {
        this.$emit('submit', response)
        this.$refs.captcha.reset()
      }
    }
  }
</script>
