<template>
  <div class="page page-home">
    <page-head
      :title="story.content.title"
      :abstract="story.content.abstract"
      :image="story.content.image"
      :quick-links="story.content.quicklinks" />
    <dynamic-component
      v-for="(block, i) in story.content.blocks"
      :key="block._uid"
      :index="i"
      :block="block" />
    <div class="page__stripe" />
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
        const { data } = await app.$storyapi.get('cdn/stories/home', {
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
  .page__stripe {
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: $color-primary;
    z-index: -1;

    @include mq($until: lg) {
      display: none;
    }
  }
</style>
