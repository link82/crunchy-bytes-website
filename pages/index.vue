<template>
  <div class="page page-home">
    <full-page
      id="fullpage"
      ref="fullpage"
      :options="fullpageOpts">
      <page-head
        home
        :image="story.content.image"
        :boxes="story.content.boxes"
        :color="story.content.color.color"
        data-fp-section>
        <template v-slot:content>
          <heading
            size="xl"
            :rich-text="story.content.title" />
          <rich-text
            :content="story.content.abstract"
            class="page__abstract" />
        </template>
      </page-head>
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
  import BridgeMixin from '@/mixins/storybridge'
  import DynamicComponent from '@/components/DynamicComponent'
  import PageHead from '@/components/PageHead'

  export default {
    components: {
      DynamicComponent,
      PageHead
    },
    mixins: [ BridgeMixin ],
    async asyncData ({ app, error, store }) {
      try {
        const { data } = await app.$storyapi.get('cdn/stories/index', {
          version: store.state.version
        })
        return {
          ...data,
          fullpageOpts: {
            licenseKey: 'lol',
            sectionSelector: '[data-fp-section]',
            slideSelector: '[data-fp-slide]'
          }
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
    mounted () {
      this.$root.$on('fp:update', () => {
        this.$refs.fullpage.build()
      })
    }
  }
</script>

<style lang="scss">
  .page__abstract {
    width: 60%;

    @include mq($until: lg) {
      display: none;
    }
  }
</style>
