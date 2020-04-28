<template>
  <div class="page page-home">
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
    <dynamic-component
      v-for="(block, i) in story.content.blocks"
      :key="block._uid"
      :index="i"
      :block="block" />
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
      store.commit('setStripeColor', '#1A788C')
      try {
        const { data } = await app.$storyapi.get('cdn/stories/index', {
          version: store.state.version
        })
        return data
      } catch (err) {
        if (!err.response) {
          console.error(err)
          error({ statusCode: 404, message: 'Failed to receive content from API' })
        } else {
          console.error(err.response.data)
          error({ statusCode: err.response.status, message: err.response.data })
        }
      }
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
