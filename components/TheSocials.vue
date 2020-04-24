<template>
  <nav class="socials">
    <ul class="socials__list">
      <li
        v-for="s in settings.socials"
        :key="s._uid">
        <link-wrapper
          :to="s.url"
          :title="s.label"
          class="socials__link">
          <icon
            v-if="s.icon"
            :name="s.icon.toLowerCase()" />
          <span v-if="s.label">
            {{ s.label }}
          </span>
        </link-wrapper>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'settings'
      ])
    }
  }
</script>

<style lang="scss">
  .socials {
    position: absolute;
    bottom: 55px;
    left: 40px;
  }

  .socials__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: -7.5px;

    > li {
      display: inline-block;
      padding: 7.5px 0;
    }
  }

  .socials__link {
    display: flex;
    align-items: center;
    color: $color-background;
    font-size: 18px;
    padding: 7.5px;

    > svg {
      font-size: 22px;
    }

    > svg + span {
      margin-left: 14px;
    }
  }
</style>
