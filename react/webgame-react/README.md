## webpack-dev-server 4 버전

  - `publicPath` 프로퍼티가 사라짐
  - 아래와 같이 `devMiddleware`로 사용

    ```js
      devServer: {
      devMiddleware: { publicPath: '/dist' },
      static: { directory: path.resolve(__dirname) },
      hot: true,
    },
    ```

  - 또 hot module 관련 아래 plugin 설치 필요
    - package.json 일부
      ```json
        "devDependencies": {
          ...
        "@pmmmwh/react-refresh-webpack-plugin": "^0.5.0-rc.5",
        "babel-loader": "^8.1.0",
        "react-refresh": "^0.10.0",
        ...
        }
      ```

- `for`, `class` 는 JS 에서 예약어이기 때문에, html attribute에서 아래와 같이 사용
  - `for` => `htmlFor`
  - `class` => `className`
