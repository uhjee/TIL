const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 5555,
    static: {
      directory: path.join(__dirname, '../../dist/client'),
    },
    hot: true,
  },
});
