const path = require('path')

module.exports = {
  name: 'gugudan-webpack',
  mode: 'development', // 실 서비스에는 production
  devtool: 'eval', // 실 서비스에는 hidden-source-map

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 입력
  entry: {
    app: ['./client'],
  },
  module: {
    rules: [
      {
        // js 와 jsx
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }
}