const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'gugudan-webpack',
  mode: 'development', // 실 서비스에는 production
  devtool: 'eval', // 실 서비스에는 hidden-source-map

  // 확장자 생략 가능
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 01. 입력
  entry: {
    app: ['./client'],
  },
  // 02. 각 module 에 대한 처리 (Loaders)
  module: {
    rules: [
      {
        // js 와 jsx
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          // preset: plugin 들의 모음
          presets: [
            [
              '@babel/preset-env',
              // preset 세부 설정
              {
                targets: {
                  // 지원 브라우저에 대한 설정
                  browsers: ['> 5% in KR'],
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [],
        },
      },
    ],
  },
  // 03. 번들된 결과에 대한 처리
  plugins: [
    // 모든 loader에 {debug: true} 적용
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],

  // 04. 출력
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
};
