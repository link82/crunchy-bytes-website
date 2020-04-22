export const state = () => ({
  isReady: false,
  isCrawler: false
})

export const mutations = {
  setIsReady (state, value) {
    state.isReady = value
  },
  setIsCrawler (state, value) {
    state.isCrawler = value
  }
}

export const actions = {
  // async nuxtServerInit ({ commit }, { app }) {}
}
