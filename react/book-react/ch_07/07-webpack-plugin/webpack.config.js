const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  /** ---------------ENTRY----------------- */
  entry: './src/index.js',
  /** ---------------OUTPUT----------------- */
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  /** ---------------LOADER----------------- */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  /** ---------------PLUGINS----------------- */
  plugins: [
    // 01-1. webpack이 실행될 때, dist 폴더를 정라하는 플러그인
    new CleanWebpackPlugin(),
    // 01-2. index.html 자동 생성하는 플러그인
    new HtmlWebpackPlugin({
      template: './template/index.html', // 자동 생성 시, 우리가 원하는 template대로 생성하도록
    }),
    // 02. 문자열 대체 플러그인
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('1.2.3'),
      TEN: '10',
    }),
    // 03. 미리 전역으로 모듈 등록
    new webpack.ProvidePlugin({
      React: 'react',
      $: 'jquery',
    }),
  ],
  mode: 'production',
};
