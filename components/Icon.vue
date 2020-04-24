<template functional>
  <svg
    :class="[
      'icon',
      `icon--${props.name}`,
      { 'icon--clickable': listeners['click'] },
      data.class,
      data.staticClass
    ]"
    v-on="listeners['click'] ? { click: listeners['click'] } : null">
    <use :xlink:href="`/ico-defs.svg#${props.name}`" />
  </svg>
</template>
