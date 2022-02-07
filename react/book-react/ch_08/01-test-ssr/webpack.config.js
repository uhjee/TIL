const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getConfig(isServer) {
  return {
    entry: isServer
      ? { server: './src/server.js' }
      : { main: './src/index.js' },
    output: {
      // server는 캐싱 효과 필요 X
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      // html-webpack-plugin이 HTML 생성 시, HTML 내부 리소스 파일의 경로를 만들 때 사용
      publicPath: '/dist/',
    },
    // server는 node 특화 번들링
    target: isServer ? 'node' : 'web',
    // node_modules 디렉토리 하위 모듈은 번들 파일에 포함 X
    externals: isServer ? [nodeExternals()] : [],
    // false -> 일반적인 node의 __dirname로 동작
    node: {
      __dirname: false,
    },
    optimization: isServer
      ? {
          // server 코드는 압축 필요 X
          splitChunks: false,
          minimize: false,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js',
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: isServer ? false : true,
            },
          },
        },
      ],
    },
    plugins: isServer
      ? []
      : [
          // new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            template: './template/index.html',
          }),
        ],
    mode: 'production',
  };
}

// 배열의 요소 수 만큼 웹팩이 실행
module.exports = [getConfig(false), getConfig(true)];

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: '[name].[chunkhash].js',
//     path: path.resolve(__dirname, 'dist'),
//     // html-webpack-plugin이 HTML 생성 시, HTML 내부 리소스 파일의 경로를 만들 때 사용
//     publicPath: '/dist/',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             configFile: path.resolve(__dirname, '.babelrc.client.js'),
//           },
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './template/index.html',
//     }),
//   ],
//   mode: 'production',
// };
