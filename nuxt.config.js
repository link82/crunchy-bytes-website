const env = process.env.NODE_ENV
const port = process.env.PORT || 3000
const host = '0.0.0.0'

export default {
  mode: 'universal',
  server: {
    port,
    host
  },
  env: {
    ddENV: env
  },
  modern: env !== 'development',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#1A788C' },
  css: [],
  plugins: [
    { src: '~plugins/global-components.js' },
    { src: '~plugins/json-ld.js' },
    { src: '~plugins/polyfills.js', mode: 'client' },
    { src: '~plugins/what-input.js', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-purgecss'
  ],
  axios: {},
  purgeCSS: {},
  render: {
    http2: {
      push: true
    }
  },
  build: {
    cache: env !== 'development',
    extractCSS: env !== 'development',
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    terser: {
      parallel: true,
      cache: false,
      sourceMap: false,
      extractComments: {
        filename: 'LICENSES'
      },
      terserOptions: {
        safari10: true,
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/
        }
      }
    }
  }
}
