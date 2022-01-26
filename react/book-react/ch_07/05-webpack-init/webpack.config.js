const path = require('path');

module.exports = {
  entry: './src/index.js',   // 시작점, 입력 파일
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: { minimizer: [] },
};
