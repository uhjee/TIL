const path = require('path');

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 실서비스에서는 : production
  devtool: 'eval',

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
        // js와 jsx
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },

  // 출력
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
};
