/*
 * @Author: lich
 * @Date: 2019-10-24 17:56:09
 * @Last Modified by: lich
 * @Last Modified time: 2020-01-17 14:24:30
 * @TODO:采用cdn加速
 */
// / <reference types="./nodejs.d.ts" />
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

/** @type { import("webpack").Configuration } */
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  // watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: 'bundle.js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        // exclude: [path.resolve(__dirname, 'node_modules')],
        // include: [
        // path.resolve(__dirname, 'src'),
        // path.resolve(__dirname, 'node_modules/ol/ol.css'),
        // ],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/ol/ol.css'),
        ],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|topojson)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ngol: path.resolve(__dirname, 'src/component/ol'),
    },
  },
  // https://webpack.docschina.org/concepts/mode/#mode-production
  optimization: {
    // minimize:false
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // inline: true,
    // compress: true,
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
