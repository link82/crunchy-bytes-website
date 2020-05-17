<template>
  <div
    class="textarea-field"
    :class="[
      { 'textarea-field--disabled': disabled },
      { 'textarea-field--error': !!error },
      { 'textarea-field--focused': isFocused },
      { 'textarea-field--dirty': dirty && !!value }
    ]">
    <textarea
      :id="id"
      :name="id"
      :value="value"
      :required="required"
      :disabled="disabled"
      class="textarea-field__field"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="$emit('input', $event.target.value)" />
    <label
      v-if="label"
      :for="id"
      class="textarea-field__label">
      {{ `${label}${required ? ' *' : ''}` }}
    </label>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    name: 'TextareaField',
    props: {
      id: VueTypes.string,
      value: VueTypes.string,
      label: VueTypes.string,
      error: VueTypes.string,
      dirty: VueTypes.bool.def(false),
      disabled: VueTypes.bool.def(false),
      required: VueTypes.bool.def(false),
      readonly: VueTypes.bool.def(false)
    },
    data () {
      return {
        isFocused: false
      }
    },
    methods: {
      handleFocus (event) {
        this.isFocused = true
        this.$emit('focus', event)
      },
      handleBlur (event) {
        this.isFocused = false
        this.$emit('blur', event)
      }
    }
  }
</script>

<style lang="scss">
  .textarea-field {
    position: relative;
    margin-bottom: 35px;
    border-bottom: 1px solid currentColor;
    transition: opacity $transition-timing;
  }

  .textarea-field--disabled {
    opacity: 0.4;

    &, .textarea-field__field {
      cursor: not-allowed;
    }
  }

  .textarea-field--error {
    border-color: $color-purple;
  }

  .textarea-field--focused,
  .textarea-field--dirty {
    .textarea-field__label {
      transform: translateY(calc(100% + 12px)) scale(0.9);
      opacity: 1;
    }
  }

  // chrome only
  .textarea-field__field:-webkit-autofill + .textarea-field__label {
    transform: translateY(calc(100% + 12px)) scale(0.9);
    opacity: 1;
  }

  .textarea-field__label,
  .textarea-field__field {
    font-size: 14px;
    line-height: 1;
    font-weight: 700;
    color: currentColor;
  }

  .textarea-field__label {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.6;
    transform-origin: top left;
    transition-property: transform, color, opacity;
    transition-duration: $transition-timing;
    transition-timing-function: ease-out;
    pointer-events: none;
  }

  .textarea-field__field {
    display: flex;
    width: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    padding-top: 5px;
    min-height: 60px;
    vertical-align: middle;
    white-space: normal;
    background-color: transparent;
    line-height: 1.4285;
    resize: none;
  }
</style>
