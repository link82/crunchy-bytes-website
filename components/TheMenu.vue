<template>
  <transition
    name="clip"
    @after-enter="handleEnter"
    @before-leave="handleLeave">
    <aside class="menu">
      <ul class="menu__list">
        <li
          v-for="link in settings.navigation"
          :key="link._uid">
          <menu-item
            :to="link.url"
            :label="link.label"
            :image="link.image" />
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import MenuItem from '@/components/MenuItem'

  export default {
    components: {
      MenuItem
    },
    data () {
      return {
        itemsVisible: false
      }
    },
    computed: {
      ...mapState([
        'settings'
      ])
    },
    methods: {
      handleEnter () {
        this.itemsVisible = true
      },
      handleLeave () {
        this.itemsVisible = false
      }
    }
  }
</script>

<style lang="scss">
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color-primary;
    transition: clip-path 2s;
    clip-path: polygon(50% -100%, -100% 200%, 200% 200%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 100px;
  }

  .clip-enter,
  .clip-leave-to {
    clip-path: polygon(90% 5%, 85% 10%, 95% 10%);
  }
</style>
