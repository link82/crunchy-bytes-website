<template>
  <vue-recaptcha
    ref="recaptcha"
    :sitekey="apikey"
    size="invisible"
    @verify="$emit('verify', $event)"
    @expired="reset" />
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  import loadScript from '@/utils/loadScript'

  export default {
    components: {
      VueRecaptcha
    },
    data () {
      return {
        apikey: 'GOOGLE_RECAPTCHA_KEY'
      }
    },
    async mounted () {
      if (!document.querySelector('#grecaptcha-script')) {
        await loadScript({
          tag: 'script',
          attributes: {
            id: 'grecaptcha-script',
            src: 'GOOGLE_RECAPTCHA_API',
            type: 'text/javascript'
          }
        })
      }
    },
    destroyed () {
      if (window.grecaptcha && window.___grecaptcha_cfg && window.___grecaptcha_cfg.clients) {
        Object.keys(window.___grecaptcha_cfg.clients).forEach(clientID => window.grecaptcha.reset(clientID))
      }
    },
    methods: {
      reset () {
        this.$refs.recaptcha.reset()
      },
      exec () {
        this.$refs.recaptcha.execute()
      }
    }
  }
</script>

<style lang="scss">
  .grecaptcha-badge {
    z-index: 2;
  }
</style>
