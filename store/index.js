export const state = () => ({
  currentMQ: null,
  isReady: false,
  isCrawler: false,
  isMenuOpen: false,
  logoLight: true,
  logoSmall: false,
  headerSolid: false,
  stripeSmall: false,
  stripeRight: false,
  stripeColor: null,
  version: null,
  cacheVersion: '',
  settings: null
})

export const mutations = {
  setCurrentMQ (state, value) {
    state.currentMQ = value
  },
  setIsReady (state, value) {
    state.isReady = value
  },
  setIsCrawler (state, value) {
    state.isCrawler = value
  },
  setMenuOpen (state, value) {
    state.isMenuOpen = value
  },
  setLogoLight (state, value) {
    state.logoLight = value
  },
  setLogoSmall (state, value) {
    state.logoSmall = value
  },
  setHeaderSolid (state, value) {
    state.headerSolid = value
  },
  setStripeSmall (state, value) {
    state.stripeSmall = value
  },
  setStripeRight (state, value) {
    state.stripeRight = value
  },
  setStripeColor (state, value) {
    state.stripeColor = value
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
