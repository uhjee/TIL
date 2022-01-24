const path = require('path');

module.exports = {
  entry: './src/code.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'code.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // babel.config.js 설정값 참조
      },
    ],
    // optimization: { minimizer: [] },
  },
};
