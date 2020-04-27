<template>
  <swipe>
    <aside class="menu">
      <div
        data-anim-content
        class="menu__content">
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
        <the-socials />
      </div>
      <div
        data-anim-color
        class="menu__swipe" />
    </aside>
  </swipe>
</template>

<script>
  import { mapState } from 'vuex'
  import MenuItem from '@/components/MenuItem'
  import TheSocials from '@/components/TheSocials'
  import Swipe from '@/components/transitions/Swipe'

  export default {
    components: {
      MenuItem,
      TheSocials,
      Swipe
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
  }

  .menu__content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding: 100px;
    background-color: $color-primary;
  }

  .menu__swipe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $color-purple;
    visibility: hidden;
  }

</style>
