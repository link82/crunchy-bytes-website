module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  'rules': {
    'indent': [
      'warn',
      2,
      { 'SwitchCase': 1 }
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'template-curly-spacing' : 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'eqeqeq': 'off',
    'camelcase': 'off',
    'eol-last': 'off',
    'no-extra-boolean-cast': 'off',
    'quote-props': [
      'warn',
      'consistent'
    ],
    'vue/component-name-in-template-casing': [
      'warn',
      'kebab-case'
    ],
    'vue/use-v-on-exact': 'off',
    'vue/prop-name-casing': 'warn',
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/no-v-html': 'off'
  },
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off',
        'vue/script-indent': [
          'warn',
          2,
          { 'baseIndent': 1, 'switchCase': 1 }
        ]
      }
    }
  ]
}
