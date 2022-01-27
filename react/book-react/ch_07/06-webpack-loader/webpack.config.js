const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // .js  확장자를 갖는 모듈은 babel-loader가 처리하도록 설정
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // css-loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // loader는 배열 가장 우측부터 적용
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192, // 파일 크기가 이 값보다 큰 경우 다른 로더가 처리하도록 fullback 옵션 제공
        //     },
        //   },
        // ],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  mode: 'production',
};
