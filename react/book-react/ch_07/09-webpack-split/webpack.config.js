const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // code split을 위해 entry 파일을 각각 입력
  entry: {
    // page1: './src/index1.js',
    // page2: './src/index2.js',
    page3: './src/index3.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()],
  // optimization: {
  //   // 코드 분할 설정
  //   splitChunks: {
  //     chunks: 'all', // 동적 임포트가 아니더라도 코드 분할되도록
  //     minSize: 10,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 2,
  //         name: 'vendors',
  //       },
  //       defaultVendors: {
  //         minChunks: 1,
  //         priority: 1,
  //         name: 'default',
  //       },
  //     },
  //     name: 'vendor',
  //   },
  // },
  mode: 'production',
};
