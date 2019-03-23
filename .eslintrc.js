module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    jest: true,
    node: true
  },
  rules: {
    'global-require': 'off',
    'prettier/prettier': 'warn',
    'import/no-dynamic-require': 'off'
  }
};
