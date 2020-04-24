<template>
  <component
    :is="dynamicComponent"
    v-bind="block"
    :index="index" />
</template>

<script>
  import VueTypes from 'vue-types'
  import capitalize from 'lodash.capitalize'

  export default {
    name: 'DynamicBlock',
    props: {
      block: VueTypes.object,
      index: VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.string
      ])
    },
    computed: {
      dynamicComponent () {
        if (!this.block?.component) { return null }
        const name = this.block.component.split(/[-_]/g).map(c => capitalize(c)).join('')
        return () => import(`@/components/${name}`)
      }
    },
    methods: {
      capitalize
    }
  }
</script>
