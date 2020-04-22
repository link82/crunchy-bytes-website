<template>
  <div>
    <h1>
      {{ story.content.title }}
    </h1>
    <p>
      {{ story.content.abstract }}
    </p>
  </div>
</template>

<script>
  import BridgeMixin from '@/mixins/storybridge'

  export default {
    mixins: [ BridgeMixin ],
    async asyncData ({ app, error }) {
      try {
        const { data } = await app.$storyapi.get('cdn/stories/home', {
          version: 'draft'
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
