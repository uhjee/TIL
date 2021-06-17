# parcel

- 자동화가 잘 되어 있어 webpack보다 간편함



## 정적파일 연동 자동화

- favicon.ico 등 정적파일들도 자동으로 번들링되도록 해주는 패키지 설치

- ```sh
  > npm install -D parcel-plugin-static-files-copy
  ```

- package.json 에 경로 설정

  - ```json
      "staticFiles": {
            "staticPath": "public",
            "watcherGlob": "**"
        }
    ```

    



## auto prefixer

```sh
 npm i -D postcss autoprefixer                         
```

web의 표준 이후의 신기술 css가 구형 브라우저등에서는 동작하지 않기 때문에, 해당 브라우저에 해당하는 표준 등으로 동작하도록

webkit, ms 등 vender prefix를 사용

- package.json

```json
  "browserslist": [
    ">1%", // 점유율 1% 이상의 브라우저에 적용
    "last 2 versions" // 최근 2가지 버전에만 적용
  ]
```

- .postcssrc.js 생성

  ```js
  const autoprefixer = require('autoprefixer');
  
  module.exports = {
    plugins: [autoprefixer],
  };
  ```



## babel

: ES6 이후의 코드를 ES5 등 이전버전에서 호환되도록 변환해주는 javascript 트랜스 컴파일러

```sh
 npm i -D @babel/core @babel/preset-env                              
```

- .babelrc.js 파일 생성

  ```js
  module.exports = {
    presets: ['@babel/preset-env'],
  };
  ```

- package.json 아래 필요

  ```js
    "browserslist": [
      ">1%", // 점유율 1% 이상의 브라우저에 적용
      "last 2 versions" // 최근 2가지 버전에만 적용
    ]
  ```

- async/await 구문을 runtime에서  사용 하기 위해서는

  ```sh
  npm i -D @babel/plugin-transform-runtime   
  ```

  
