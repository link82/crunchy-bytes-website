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
    <slot />
  </transition>
</template>

<script>
  import gsap from 'gsap'

  export default {
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

          this.timeline = gsap
            .timeline({ onComplete: done })
            .to(s, 1.5, {
              xPercent: -100,
              ease: 'power1.inOut'
            })
            .set(c, {
              visibility: 'visible'
            }, '-=0.75')
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

          this.itemsVisible = false

          this.timeline = gsap
            .timeline({ onComplete: done })
            .to(s, 1.5, {
              xPercent: 100,
              ease: 'power1.inOut'
            })
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
        this.timeline = null

        gsap.set([ s, c ], {
          clearProps: 'all'
        })
      },
      cancel () {
        this.timeline.pause()
      }
    }
  }
</script>
