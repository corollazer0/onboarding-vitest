import vue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['dist', 'coverage']
  },
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]
