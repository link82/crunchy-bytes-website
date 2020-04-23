import Vue from 'vue'

export default ({ app }) => {
  Vue.prototype.$richText = (text) => {
    if (!text) { return null }
    return app.$storyapi.richTextResolver.render(text)
  }
}
