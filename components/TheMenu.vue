<template>
  <transition
    mode="out-in"
    :css="false"
    @before-enter="beforeEnter"
    @enter="handleEnter"
    @after-enter="cleanup"
    @before-leave="beforeLeave"
    @leave="handleLeave"
    @after-leave="cleanup"
    @enter-cancelled="cancel"
    @leave-cancelled="cancel">
    <aside class="menu">
      <div
        data-anim-content
        class="menu__content">
        <ul
          data-anim-list
          class="menu__list">
          <li
            v-for="link in settings.navigation"
            :key="link._uid">
            <menu-item
              :to="link.url"
              :label="link.label"
              :image="link.image" />
          </li>
        </ul>
        <the-socials data-anim-socials />
      </div>
      <div
        data-anim-color
        class="menu__swipe" />
    </aside>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import gsap from 'gsap'
  import MenuItem from '@/components/MenuItem'
  import TheSocials from '@/components/TheSocials'

  export default {
    components: {
      MenuItem,
      TheSocials
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
    created () {
      this.timeline = null
    },
    methods: {
      beforeEnter (el) {
        if (!this.timeline) {
          const s = el.querySelector('[data-anim-color]')
          const c = el.querySelector('[data-anim-content]')

          gsap.set(s, {
            xPercent: 100,
            visibility: 'visible'
          })

          gsap.set(c, {
            visibility: 'hidden'
          })
        }
      },
      handleEnter (el, done) {
        if (!this.timeline) {
          const s = el.querySelector('[data-anim-color]')
          const c = el.querySelector('[data-anim-content]')
          const i = el.querySelectorAll('[data-anim-list] li')
          const ss = el.querySelectorAll('[data-anim-socials]')

          this.timeline = gsap
            .timeline({ onComplete: done })
            .to(s, 1.5, {
              xPercent: -100,
              ease: 'power1.inOut'
            })
            .set(c, {
              visibility: 'visible'
            }, '-=0.75')
            .from(i, 0.5, {
              x: 15,
              opacity: 0,
              stagger: 0.1
            }, 'lists-=0.25')
            .from(ss, 0.5, {
              x: -15,
              opacity: 0
            }, 'lists-=0.25')
            .add(() => {
              this.$emit('enter')
            })
        } else if (this.timeline.reversed()) {
          this.timeline.eventCallback('onComplete', done)
          this.timeline.play()
        } else {
          this.timeline.eventCallback('onReverseComplete', done)
          this.timeline.reverse()
        }
      },
      beforeLeave (el) {
        if (!this.timeline) {
          const s = el.querySelector('[data-anim-color]')

          gsap.set(s, {
            xPercent: -100,
            visibility: 'visible'
          })
        }
      },
      handleLeave (el, done) {
        if (!this.timeline) {
          const s = el.querySelector('[data-anim-color]')
          const c = el.querySelector('[data-anim-content]')
          const i = el.querySelectorAll('[data-anim-list] li')
          const ss = el.querySelectorAll('[data-anim-socials]')

          this.itemsVisible = false

          this.timeline = gsap
            .timeline({ onComplete: done })
            .to(i, 0.5, {
              x: 15,
              opacity: 0,
              stagger: 0.1
            }, 'lists')
            .to(ss, 0.5, {
              x: -15,
              opacity: 0
            }, 'lists')
            .to(s, 1.5, {
              xPercent: 100,
              ease: 'power1.inOut'
            }, '-=0.25')
            .set(c, {
              visibility: 'hidden'
            }, '-=0.75')
            .add(() => {
              this.$emit('leave')
            })
        } else if (this.timeline.reversed()) {
          this.timeline.eventCallback('onComplete', done)
          this.timeline.play()
        } else {
          this.timeline.eventCallback('onReverseComplete', done)
          this.timeline.reverse()
        }
      },
      cleanup (el) {
        const s = el.querySelector('[data-anim-color]')
        const c = el.querySelector('[data-anim-content]')
        const i = el.querySelectorAll('[data-anim-list] li')
        const ss = el.querySelectorAll('[data-anim-socials]')

        this.timeline = null

        gsap.set([ s, c, i, ss ], {
          clearProps: 'all'
        })
      },
      cancel () {
        this.timeline.pause()
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
  }

  .menu__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding: 60px;
    padding-right: calc(30% - 45px);
    background-color: rgba($color-primary, 0.8);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 30%;
      height: 100%;
      background-color: $color-background;
    }

    @include mq(lg) {
      padding: 100px;
      padding-right: calc(300px - 45px);
      background-color: rgba($color-primary, 0.95);

      &::after {
        width: 300px;
      }
    }
  }

  .menu__list {
    z-index: 1;
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
