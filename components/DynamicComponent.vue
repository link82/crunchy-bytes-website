<template>
  <component
    :is="type"
    v-bind="block"
    :index="index" />
</template>

<script>
  import VueTypes from 'vue-types'
  import capitalize from 'lodash.capitalize'
  import Services from '@/components/Services'

  export default {
    name: 'DynamicBlock',
    components: {
      Services
    },
    props: {
      block: VueTypes.object,
      index: VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.string
      ])
    },
    computed: {
      type () {
        if (!this.block?.component) { return null }
        const name = this.block.component.split(/[-_]/g).map(c => capitalize(c)).join('')
        return name
      }
    },
    methods: {
      capitalize
    }
  }
</script>
