<template>
  <section class="services">
    <transition
      mode="out-in"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave">
      <div
        :key="currentActive"
        class="services__item services__item--r">
        <div class="services__img">
          <template v-for="item in items">
            <n-image
              v-show="isActive(item)"
              :key="item._uid"
              :data-anim-image="isActive(item)"
              :img="item.image" />
          </template>
        </div>
        <div
          data-anim-content
          :style="currentActiveColor"
          class="services__content">
          <template v-for="item in items">
            <div
              v-show="isActive(item)"
              :key="item._uid"
              :data-anim-text="isActive(item)"
              class="services__text">
              <heading
                size="l"
                :rich-text="item.title" />
              <rich-text :content="item.description" />
              <btn
                class="services__btn"
                @click="change">
                Taste this
              </btn>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import VueTypes from 'vue-types'
  import gsap from 'gsap'
  import { mapGetters } from 'vuex'

  export default {
    inheritAttrs: false,
    props: {
      items: VueTypes.array,
      index: VueTypes.oneOfType([
        VueTypes.number,
        VueTypes.string
      ])
    },
    data () {
      return {
        currentActive: null
      }
    },
    computed: {
      currentActiveItem () {
        return this.items.find(i => i._uid === this.currentActive)
      },
      currentActiveColor () {
        if (this.isDesktop) { return null }
        return `background-color: ${this.currentActiveItem.color.color};`
      },
      ...mapGetters([
        'isDesktop'
      ])
    },
    created () {
      this.currentActive = this.items[0]._uid
    },
    mounted () {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.$store.commit('setStripeColor', this.currentActiveItem.color.color)
          this.$store.commit('setStripeSmall', true)
        }
      }, { rootMargin: '-60% 0px -40% 0px' })
      this.observer.observe(this.$el)
    },
    beforeDestroy () {
      this.observer.disconnect()
    },
    methods: {
      change () {
        this.$store.commit('setStripeSmall', true)
        if (this.currentActive === this.items[0]._uid) {
          this.currentActive = this.items[1]._uid
          this.$store.commit('setStripeColor', this.items[1].color.color)
        } else {
          this.currentActive = this.items[0]._uid
          this.$store.commit('setStripeColor', this.items[0].color.color)
        }
      },
      beforeEnter (el) {
        const img = el.querySelector('[data-anim-image]')
        const imgStripeFrom = img.querySelector('[data-anim-stripe-from]')
        imgStripeFrom.classList.add('image__stripe--half')
      },
      enter (el, done) {
        const img = el.querySelector('[data-anim-image]')
        const content = el.querySelector('[data-anim-content]')
        const txt = el.querySelector('[data-anim-text]')
        const imgStripeFrom = img.querySelector('[data-anim-stripe-from]')
        const imgStripeTo = img.querySelector('[data-anim-stripe-to]')

        const tl = gsap
          .timeline()
          .to(imgStripeFrom, 0.5, {
            x: '-100%'
          })
          .to(imgStripeTo, 1, {
            x: '-100%'
          }, '-=0.5')

        if (this.isDesktop) {
          tl.from(txt, 0.5, {
            opacity: 0
          }, '-=1')
        } else {
          tl.from(content, 0.5, {
            y: '100%',
            opacity: 0
          })
        }

        tl.add(() => {
          imgStripeFrom.classList.remove('image__stripe--half')
        })
          .set([ imgStripeFrom, imgStripeTo ], {
            clearProps: 'all'
          })
          .add(done)
      },
      leave (el, done) {
        const img = el.querySelector('[data-anim-image]')
        const content = el.querySelector('[data-anim-content]')
        const txt = el.querySelector('[data-anim-text]')
        const imgStripe = img.querySelector('[data-anim-stripe-from]')

        const tl = gsap
          .timeline()

        if (!this.isDesktop) {
          tl.to(content, 0.5, {
            y: '100%',
            opacity: 0
          })
        }

        tl.to(imgStripe, 0.5, {
          x: 0
        })

        if (this.isDesktop) {
          tl.to(txt, 0.5, {
            opacity: 0
          }, '-=0.5')
        }

        tl.set(imgStripe, {
          clearProps: 'all'
        })
          .add(done)
      },
      isActive (item) {
        return this.currentActive === item._uid
      },
      bgColor (item) {
        if (!item.color?.color) { return null }
        return `background-color: ${item.color.color};`
      }
    }
  }
</script>

<style lang="scss">
  .services {
    display: block;
    height: 100%;
  }

  .services__item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @include mq(lg) {
      flex-direction: row-reverse;
      justify-content: initial;
      align-items: center;
      padding-left: 150px;
      padding-right: 150px;
      flex-wrap: wrap;
    }
  }

  .services__item--r {
    @include mq(lg) {
      flex-direction: row;
      .services__text {
        padding-left: 40px;
        padding-right: 0px
      }
    }
  }

  .services__content {
    position: relative;
    flex: 0 0 40%;
    min-height: 280px;
    overflow: auto;

    @include mq(lg) {
      overflow: initial;
      min-height: none;
      background-color: transparent !important;
    }
  }

  .services__img {
    .image {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include mq($until: lg) {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }

  .services__content,
  .services__img {
    @include mq(lg) {
      flex: 0 0 50%;
    }
  }

  .services__text {
    padding: 20px;
    font-weight: 300;
    color: $color-black;

    @include mq(lg) {
      padding: 0;
      padding-right: 40px;
      background-color: transparent !important;
    }

    > .heading {
      margin-bottom: 20px;
    }

    > .rich-text {
      margin-bottom: 30px;
    }
  }

  .services__btn {
    @include mq(lg) {
      position: absolute;
      top: 120%;
      // transform: translateX(-100%);
    }
  }

</style>
