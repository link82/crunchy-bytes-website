import Vue from 'vue'

export default ({ app }) => {
  Vue.prototype.$getLinkDestination = (link) => {
    switch (link.linktype) {
      case 'url':
        return link.url
      case 'email':
        return `mailto:${link.email}`
      case 'story':
        return app.localePath({ name: link.cached_url })
    }
  }
}
