<template>
  <main>
    <the-header />
    <nuxt />
    <the-footer />
  </main>
</template>

<script>
  import TheHeader from '@/components/TheHeader'
  import TheFooter from '@/components/TheFooter'

  export default {
    components: {
      TheHeader,
      TheFooter
    }
  }
</script>
