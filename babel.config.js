const plugins = [];

const IS_PROD = process.env.NODE_ENV === 'production';

console.log(IS_PROD, process.env.NODE_ENV);
if (IS_PROD) {
  plugins.unshift([
    /** https://babeljs.io/docs/en/babel-plugin-transform-remove-console */
    ['transform-remove-console'],
    {
      exclude: ['error', 'warn'],
    },
  ]);
  // plugins.push('@babel/plugin-transform-runtime');
}
module.exports = {
  presets: [
    /** https://babeljs.io/docs/en/babel-preset-env */
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        // 声明corejs版本
        corejs: '3',
        //  "targets": {
        //   "browsers": "last 2 chrome versions"
        // }
      },
    ],
  ],
  plugins,
};
