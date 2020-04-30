export default ({ app, store }) => {
  if (app.$cookies.get('cookies-accepted')) {
    store.commit('setCookiesAccepted', true)
  }
}
