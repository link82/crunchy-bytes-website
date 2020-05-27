<template>
  <div class="page page-home">
    <full-page
      id="fullpage"
      ref="fullpage"
      :options="fullpageOpts">
      <div data-fp-section>
        <div class="header-spacer" />
        <page-head
          home
          :image="story.content.image"
          :boxes="story.content.boxes">
          <template v-slot:content>
            <heading
              size="xl"
              :rich-text="story.content.title" />
            <rich-text
              :content="story.content.abstract"
              class="page__abstract" />
          </template>
        </page-head>
      </div>
      <dynamic-component
        v-for="(block, i) in story.content.blocks"
        :key="block._uid"
        :index="i"
        :block="block"
        data-fp-section />
    </full-page>
  </div>
</template>

<script>
  import gsap from 'gsap'
  import BridgeMixin from '@/mixins/storybridge'
  import DynamicComponent from '@/components/DynamicComponent'
  import PageHead from '@/components/PageHead'

  export default {
    components: {
      DynamicComponent,
      PageHead
    },
    transition: {
      css: false,
      mode: 'out-in',
      enter (el, done) {
        console.log('enter')
        el.querySelector('.page-head__img [data-anim-stripe-from]').classList.add('image__stripe--half')

        gsap
          .timeline()
          .to(document.querySelector('.stripe'), 0.35, {
            backgroundColor: this.$store.state.stripeColor
          })
          .to(document.querySelector('.stripe'), 0.35, {
            scaleX: 1
          })
          .set(document.querySelector('.stripe'), {
            clearProps: 'transform, transform-origin, transition'
          })
          .to(el.querySelector('.page-head__img [data-anim-stripe-from]'), 0.35, {
            x: '-100%'
          })
          .to(el.querySelector('.page-head__img [data-anim-stripe-to]'), 1, {
            x: '-100%'
          }, '-=0.5')
          .from('.page-head__content', 0.5, {
            x: -20,
            opacity: 0
          })
          .from(el.querySelector('.socials'), 0.35, {
            x: -20,
            opacity: 0
          })
          .set(el.querySelector('.page-head'), {
            overflow: 'hidden'
          })
          .from(el.querySelector('.page-head__links'), 0.5, {
            y: '100%',
            opacity: 0
          })
          .add(() => {
            el.querySelector('.page-head__img [data-anim-stripe-from]').classList.remove('image__stripe--half')
            done()
          })
      },
      leave (el, done) {
        console.log('leave')

        gsap
          .timeline()
          .to(el.querySelector('.page-head__links'), 0.5, {
            y: '100%',
            opacity: 0
          })
          .to(el.querySelector('.socials'), 0.35, {
            x: -20,
            opacity: 0
          })
          .to(el.querySelector('.page__title'), 0.45, {
            x: -20,
            opacity: 0
          })
          .to(el.querySelector('.page__abstract'), 0.45, {
            x: -20,
            opacity: 0
          }, '-=0.3')
          .to(el.querySelector('.page-head__img [data-anim-stripe-from]'), 0.35, {
            x: 0
          })
          .set(document.querySelector('.stripe'), {
            transformOrigin: 'left',
            transition: 'background-color 350ms'
          })
          .to(document.querySelector('.stripe'), 0.35, {
            scaleX: 2
          })
          .add(done)
      }
    },
    mixins: [ BridgeMixin ],
    async asyncData ({ app, error, store }) {
      try {
        const { data } = await app.$storyapi.get('cdn/stories/index', {
          version: store.state.version
        })
        return {
          ...data
        }
      } catch (err) {
        if (!err.response) {
          console.error(err)
          error({ statusCode: 404, message: 'Failed to receive content from API' })
        } else {
          console.error(err.response.data)
          error({ statusCode: err.response.status, message: err.response.data })
        }
      }
    },
    data () {
      return {
        fullpageOpts: {
          licenseKey: 'lol',
          sectionSelector: '[data-fp-section]',
          slideSelector: '[data-fp-slide]',
          onLeave: this.handleScroll
        }
      }
    },
    mounted () {
      this.$root.$on('fp:update', () => {
        this.$refs.fullpage.build()
      })

      this.$root.$on('menu:open', this.disableScroll)
      this.$root.$on('menu:close', this.enableScroll)
    },
    beforeDestroy () {
      this.$root.$off('menu:open')
      this.$root.$off('menu:close')
    },
    methods: {
      handleScroll (origin, destination, direction) {
        console.log(destination.index)
        if (destination.index == 0) {
          this.$store.commit('setStripeColor', this.story.content.color.color)
          this.$store.commit('setStripeSmall', false)
        } else {
          this.$store.commit('setStripeColor', '#ffcc00')
          this.$store.commit('setStripeSmall', true)
        }
      },
      disableScroll () {
        this.$refs.fullpage.api.setAllowScrolling(false)
        this.$refs.fullpage.api.setKeyboardScrolling(false)
      },
      enableScroll () {
        this.$refs.fullpage.api.setAllowScrolling(true)
        this.$refs.fullpage.api.setKeyboardScrolling(true)
      }
    }
  }
</script>

<style lang="scss">
  .page__title {
    margin-bottom: 20px;
  }

  .page__abstract {
    width: 60%;

    @include mq($until: lg) {
      display: none;
    }
  }

  .header-spacer {
    width: 100%;
    height: $header-height-mobile;
    background-color: $color-primary;

    @include mq(lg) {
      display: none;
    }
  }
</style>
