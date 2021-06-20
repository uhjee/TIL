// import
// const path = require('path'); //nodeJS 전역모듈
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // 특정 폴더를 복사해 번들링 결과물에 포함되도록

// * webpack은 node.js 환경에서 동작

module.exports = {
  // file을 읽어들이기 시작하는 진입점
  entry: './js/main.js',
  // 번들된 결과물을 반환하느 설정
  output: {
    // __dirname : 현 파일이 있는 경로를 담은 전역변수
    // 하위 는 default

    // path: path.resolve(__dirname, 'public'), // nodeJS에서 필요로 하는 절대 경로를 작성해야 함
    // filename: 'main.js',
    clean: true, // 기존 번들링된 파일 삭제 후, 다시 번들 반환
  },

  module: {
    rules: [
      {
        // ! *.css 모든 파일 찾기  // s 없거나 있거나
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], // 순서 중요(뒤에서 부터 적용인 듯)
      },
      {
        test: /\.js/,
        use: ['babel-loader'],
      },
    ],
  },

  // 번들링 후 결과물 처리 방식 등 다양한 플러그인 설정 가능
  plugins: [
    new HtmlPlugin({ template: './index.html' }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],

  // default
  // devServer: {
  //   host: 'localhost',
  // },
};
