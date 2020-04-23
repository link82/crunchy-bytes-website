<template>
  <component
    :is="dynamicComponent"
    v-bind="block" />
</template>

<script>
  import VueTypes from 'vue-types'
  import capitalize from 'lodash.capitalize'

  export default {
    name: 'DynamicBlock',
    props: {
      block: VueTypes.object
    },
    computed: {
      dynamicComponent () {
        const name = this.block.component.split(/[-_]/g).map(c => capitalize(c)).join('')
        return () => import(`@/components/${name}`)
      }
    },
    methods: {
      capitalize
    }
  }
</script>
