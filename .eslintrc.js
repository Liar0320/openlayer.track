module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    //   node: true,
  },
  // parser: 'babel-eslint',
  parserOptions: {
    // parser: 'babel-eslint',
    // ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    codeFrame: true,
  },
  extends: [
    // eslint-config-airbnb-base
    'airbnb-base',
    // 'prettier',
    // https://egoist.moe/2017/12/11/write-better-code-with-eslint-and-prettier/
    'plugin:prettier/recommended',
  ],
  // plugins: ['prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    'no-console': 0,
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
  },
};
