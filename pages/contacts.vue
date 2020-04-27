<template>
  <div class="page">
    <page-head
      :image="story.content.image"
      :boxes="story.content.boxes">
      <template v-slot:content>
        <heading size="xl">
          Say hello!
        </heading>
      </template>
    </page-head>
  </div>
</template>

<script>
  import BridgeMixin from '@/mixins/storybridge'
  import PageHead from '@/components/PageHead'

  export default {
    components: {
      PageHead
    },
    mixins: [ BridgeMixin ],
    async asyncData ({ app, error, store }) {
      try {
        const { data } = await app.$storyapi.get('cdn/stories/contacts', {
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
