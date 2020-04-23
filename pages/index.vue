<template>
  <div class="page page-home">
    <div class="page-home__head">
      <div class="page-home__head-text">
        <heading size="xl">
          {{ story.content.title }}
        </heading>
        <rich-text :content="story.content.abstract" />
      </div>
      <n-image
        :img="story.content.image"
        class="page-home__head-img" />
    </div>
    <!-- <dynamic-component
      v-for="block in story.content.blocks"
      :key="block._uid"
      :block="block" /> -->
    <div class="page__stripe" />
  </div>
</template>

<script>
  import BridgeMixin from '@/mixins/storybridge'
  // import DynamicComponent from '@/components/DynamicComponent'

  export default {
    components: {
      // DynamicComponent
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
  .page-home__head {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 0;
  }

  .page-home__head-text {
    width: 50%;
    padding-left: 50px;
    padding-right: 50px;
    color: $color-background;
  }

  .page-home__head-img {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    z-index: -1;
    top: 50%;
    transform: translateY(-50%);
  }

  .page__stripe {
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: $color-primary;
    z-index: -1;
  }
</style>
