<template>
  <validation-provider
    v-slot="{ errors, dirty }"
    slim
    :name="name"
    :rules="rules">
    <component
      :is="componentName"
      :id="id"
      v-model="internalValue"
      :type="type"
      :label="label"
      :required="required"
      :disabled="disabled"
      :dirty="dirty"
      :error="error || errors[0] || null"
      :autocomplete="autocomplete"
      @select="$emit('select', $event)"
      @blur="$emit('blur')">
      <slot />
    </component>
  </validation-provider>
</template>

<script>
  import VueTypes from 'vue-types'
  import { ValidationProvider } from 'vee-validate'
  import InputField from '@/components/form/InputField'
  import TextareaField from '@/components/form/TextareaField'
  import Checkbox from '@/components/form/Checkbox'

  export default {
    components: {
      ValidationProvider,
      InputField,
      TextareaField,
      Checkbox
    },
    props: {
      id: VueTypes.string.isRequired,
      name: VueTypes.string.isRequired,
      type: VueTypes.string.def('text'),
      componentName: VueTypes.string.def('InputField'),
      rules: VueTypes.oneOfType([
        VueTypes.object,
        VueTypes.string
      ]),
      value: VueTypes.oneOfType([
        VueTypes.string,
        VueTypes.number,
        VueTypes.bool,
        VueTypes.object
      ]),
      label: VueTypes.string,
      error: VueTypes.string,
      autocomplete: VueTypes.string,
      required: VueTypes.bool.def(false),
      disabled: VueTypes.bool.def(false)
    },
    computed: {
      internalValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
