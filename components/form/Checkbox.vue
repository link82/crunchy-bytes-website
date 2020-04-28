<template>
  <div
    class="checkbox"
    :class="[
      { 'checkbox--error': !!error }
    ]">
    <div
      class="checkbox__wrapper">
      <input
        :id="id"
        :name="id"
        type="checkbox"
        :required="required"
        :aria-required="required"
        :checked="value"
        :value="value"
        :disabled="disabled"
        class="checkbox__input"
        @change="$emit('change', !value)">
      <span class="checkbox__field" />
      <label
        class="checkbox__label"
        :for="id">
        <slot>
          {{ label }} {{ required ? '*' : '' }}
        </slot>
      </label>
    </div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    name: 'Checkbox',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      id: VueTypes.string,
      label: VueTypes.string,
      value: VueTypes.bool.def(false),
      disabled: VueTypes.bool.def(false),
      error: VueTypes.string,
      required: VueTypes.bool.def(false)
    }
  }
</script>

<style lang="scss">
  $check-size: 24px !default;

  .checkbox {
    position: relative;
  }

  .checkbox--error {
    .checkbox__field {
      border-color: $color-purple;
    }

    .checkbox__label {
      color: $color-purple;
    }
  }

  .checkbox__wrapper {
    position: relative;
    display: flex;
    min-height: $check-size + 2px;
  }

  .checkbox__input {
    display: none;
  }

  .checkbox__field {
    position: absolute;
    left: 0;
    top: 50%;
    display: block;
    width: $check-size;
    height: $check-size;
    border: 1px solid currentColor;
    pointer-events: none;
    user-select: none;
    background-color: transparent;
    transform: translateY(-50%);

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 50%;
      border-radius: 100%;
      width: $check-size / 2;
      height: $check-size / 2;
      background-color: currentColor;
      opacity: 0;
      transform: translate(50%, -50%) scale(0.75) ;
      transition: transform 350ms, opacity 350ms;

      @include mq($until: md) {
        width: $check-size / 2.5;
        height: $check-size / 2.5;
      }
    }
  }

  .checkbox__input:checked {
    & + .checkbox__field::before {
      opacity: 1;
      transform: translate(50%, -50%) scale(1);
    }
  }

  .checkbox__input:disabled {
    & ~ .checkbox__label {
      cursor: not-allowed;
    }

    & ~ .checkbox__label,
    & + .checkbox__field {
      opacity: 0.6;
    }
  }

  .checkbox__label {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: $check-size + 10px;
    font-size: 14px;
    line-height: 1;
    font-weight: 700;
    cursor: pointer;

    a {
      display: inline;
    }

    @include mq($until: md) {
      padding-left: $check-size + 16px;
    }
  }
</style>
