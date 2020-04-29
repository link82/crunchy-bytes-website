export default ({ store }) => {
  window.onNuxtReady(() => {
    const getCurrentMQFromStyle = () => window.getComputedStyle(document.body, '::after').content.replace(/['"]+/g, '')

    store.commit('setCurrentMQ', getCurrentMQFromStyle())

    window.addEventListener('resize', () => {
      const currentMQ = getCurrentMQFromStyle()
      if (currentMQ !== store.state.currentMQ) {
        store.commit('setCurrentMQ', currentMQ)
      }
    })
  })
}
