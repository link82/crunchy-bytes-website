<template>
  <section class="services">
    <transition
      mode="out-in"
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
        <div class="services__content">
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

  export default {
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
      wrapperSize () {
        return `width: ${this.items.length * 100}%;`
      }
    },
    created () {
      this.currentActive = this.items[0]._uid
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

        gsap
          .set(imgStripeFrom, {
            x: 0
          })
      },
      enter (el, done) {
        const img = el.querySelector('[data-anim-image]')
        const txt = el.querySelector('[data-anim-text]')
        const imgStripeFrom = img.querySelector('[data-anim-stripe-from]')
        const imgStripeTo = img.querySelector('[data-anim-stripe-to]')

        gsap
          .timeline()
          .to(imgStripeFrom, 0.5, {
            x: '-100%'
          })
          .to(imgStripeTo, 1, {
            x: '-100%'
          }, '-=0.5')
          .from(txt, 0.5, {
            opacity: 0
          }, '-=1')
          .set([ imgStripeFrom, imgStripeTo ], {
            clearProps: 'all'
          })
          .add(done)
      },
      leave (el, done) {
        const img = el.querySelector('[data-anim-image]')
        const txt = el.querySelector('[data-anim-text]')
        const imgStripe = img.querySelector('[data-anim-stripe-from]')

        gsap
          .timeline()
          .to(imgStripe, 0.5, {
            x: 0
          })
          .to(txt, 0.5, {
            opacity: 0
          }, '-=0.5')
          .set(imgStripe, {
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
    height: 100%;
    display: flex;
    align-items: center;
  }

  .services__item {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @include mq(lg) {
      height: auto;
      flex-direction: row-reverse;
      align-items: center;
      padding-left: 150px;
      padding-right: 150px;
      flex-wrap: wrap;
    }
  }

  .services__item--r {
    flex-direction: row;

    .services__text {
      padding-left: 40px;
      padding-right: 0px
    }
  }

  .services__content {
    position: relative;
    flex: 0 0 40%;
    min-height: 280px;

    @include mq(lg) {
      min-height: none;
    }
  }

  .services__img {
    flex: 1 1 auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
