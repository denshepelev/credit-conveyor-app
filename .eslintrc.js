module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',],
  overrides: [
  ],
  parserOptions: {
    project: 'tsconfig.json', //может быть лишним, при конфликте удалить
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  }
}
