export const state = () => ({
  isReady: false,
  isCrawler: false,
  version: null,
  cacheVersion: '',
  settings: null
})

export const mutations = {
  setIsReady (state, value) {
    state.isReady = value
  },
  setIsCrawler (state, value) {
    state.isCrawler = value
  },
  setVersion (state, version) {
    state.version = version
  },
  setCacheVersion (state, version) {
    state.cacheVersion = version
  },
  setSettings (state, settings) {
    state.settings = settings
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { route, isDev }) {
    const version = route.query._storyblok || isDev ? 'draft' : 'published'
    commit('setVersion', version)

    await Promise.all([
      dispatch('loadCacheVersion'),
      dispatch('loadSettings')
    ])
  },
  async loadCacheVersion ({ commit }) {
    try {
      const { data } = await this.$storyapi.get('cdn/spaces/me')
      commit('setCacheVersion', data.space.version)
    } catch (err) {
      console.error(err)
    }
  },
  async loadSettings ({ state, commit }) {
    try {
      const { data } = await this.$storyapi.get('cdn/stories/settings', {
        version: state.version
      })
      commit('setSettings', data.story.content)
    } catch (err) {
      console.error(err)
    }
  }
}
