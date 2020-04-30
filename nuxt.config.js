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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap' }
    ]
  },
  loading: { color: '#1A788C' },
  css: [ '@/assets/stylesheets/application.scss' ],
  styleResources: {
    scss: [
      '~node_modules/sass-mq/_mq.scss',
      '~/assets/stylesheets/_variables.scss',
      '~/assets/stylesheets/_mixins.scss'
    ]
  },
  plugins: [
    { src: '~plugins/global-components.js' },
    { src: '~plugins/global-functions.js' },
    { src: '~plugins/json-ld.js' },
    { src: '~plugins/mq.js', mode: 'client' },
    { src: '~plugins/check-cookies.js' },
    { src: '~plugins/validation.js' },
    { src: '~plugins/polyfills.js', mode: 'client' },
    { src: '~plugins/what-input.js', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    [ 'storyblok-nuxt', {
      accessToken: 'tL4pD9Wn6Qya9GZM6rB87gtt',
      cacheProvider: 'memory'
    } ],
    [ 'nuxt-i18n', {
      locales: [
        {
          code: 'it',
          name: 'Italiano',
          iso: 'it-IT',
          file: 'it.js'
        },
        {
          code: 'en',
          name: 'English',
          iso: 'en-EN',
          file: 'en.js'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      seo: false,
      vuex: false,
      strategy: 'prefix_except_default',
      detectBrowserLanguage: false,
      defaultLocale: 'it'
    } ],
    '@nuxtjs/pwa',
    'nuxt-purgecss'
  ],
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
    transpile: [
      'vee-validate/dist/rules'
    ],
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
