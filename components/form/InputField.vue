<template>
  <div
    class="input-field"
    :class="[
      { 'input-field--disabled': disabled },
      { 'input-field--error': !!error },
      { 'input-field--focused': isFocused },
      { 'input-field--dirty': dirty && !!value }
    ]">
    <input
      :id="id"
      ref="input"
      :name="id"
      :type="type"
      :value="value"
      :required="required"
      :aria-required="required"
      :autocomplete="autocomplete"
      :disabled="disabled"
      class="input-field__field"
      @click="$emit('click', $event)"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="$emit('input', $event.target.value)"
      @keydown="$emit('keydown', $event)">
    <label
      v-if="label"
      :for="id"
      class="input-field__label">
      {{ `${label}${required ? ' *' : ''}` }}
    </label>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    name: 'InputField',
    props: {
      id: VueTypes.string.isRequired,
      type: VueTypes.string.def('text'),
      value: VueTypes.string,
      label: VueTypes.string,
      error: VueTypes.string,
      dirty: VueTypes.bool.def(false),
      autocomplete: VueTypes.string,
      required: VueTypes.bool.def(false),
      inlineError: VueTypes.bool.def(false),
      disabled: VueTypes.bool.def(false)
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
  .input-field {
    position: relative;
    margin-bottom: 35px;
    border-bottom: solid 1px currentColor;

    transition-property: border-color, opacity;
    transition-duration: $transition-timing;

    &.input-field--error {
      border-color: $color-purple;

      .input-field__label {
        color: $color-purple;
      }
    }

    [type='submit'] {
      line-height: 0;
    }
  }

  .input-field--disabled {
    opacity: 0.4;

    &, .input-field__field {
      cursor: not-allowed;
    }
  }

  .input-field--focused,
  .input-field--dirty {
    .input-field__label {
      transform: translateY(calc(100% + 12px)) scale(0.9);
      opacity: 1;
    }
  }

  // chrome only
  .input-field__field:-webkit-autofill + .input-field__label {
    transform: translateY(calc(100% + 12px)) scale(0.9);
    opacity: 1;
  }

  .input-field__label,
  .input-field__field {
    font-size: 14px;
    line-height: 1;
    font-weight: 700;
    color: currentColor;
  }

  .input-field__label {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1;
    opacity: 0.6;
    transform-origin: top left;
    transition-property: transform, color, opacity;
    transition-duration: $transition-timing;
    transition-timing-function: ease-out;
    pointer-events: none;
  }

  .input-field__field {
    display: block;
    width: 100%;
    min-height: 30px;
    margin: 0;
    border: 0;
    padding: 0;
    white-space: normal;
    text-overflow: ellipsis;
    background-color: transparent;
    z-index: 0;

    // @include mq($until: md) {
    //   min-height: 40px;
    // }
  }
</style>
