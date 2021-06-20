# webpack

: bundler



## 01. 환경

아래 3가지 패키지 설치

```sh
> npm i -D webpack webpack-cli webpack-dev-server@next
```

- @next는 앞의 버전과 메이저 버전을 일치시 때 사용

package.json

```json
  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
```

### webpack.config.js

webpack 에 대한 config 파일

- `path`: nodeJS에서 사용하는 전역 모듈
  - `path.resolve()`: 파라미터로 받는 string으로 경로를 생성
- `__dirname`: 현 파일이 있는 경로르 담은 전역변수

```js
// import
const path = require('path'); //nodeJS 전역모듈

// * webpack은 node.js 환경에서 동작
module.exports = {
  // file을 읽어들이기 시작하는 진입점
  entry: './js/main.js',
  // 번들된 결과물을 반환하느 설정
  output: {
    // 하위 두 옵션는 default
    // path: path.resolve(__dirname, 'public'), // nodeJS에서 필요로 하는 절대 경로를 작성해야 함
    // filename: 'main.js',
    clean: true, // 기존 번들링된 파일 삭제 후, 다시 번들 반환
  },
};
```

- entry: 진입점
- output:  번들링 결과물을 반환할 **절대경로**
  - 이전 결과물을 제거하고, 새로운 결과물 생성 (webpack 5부터 제공)

### plugin

: 번들링 후 결과물에 대해 후처리 가능

### html-webpack-plugin 설치 (plugin)

```sh
> npm i -D html-webpack-plugin 
```

package.json

```js
...
plugins: [
  new HtmlPlugin({ template: './index.html' })
],
...
```



## 02.정적 파일 연결

- copy-webpack-plugin

  : 특정 폴더를 복사해 번들링 결과물에 포함되도록

  package.json

  ```js
    plugins: [
  		...
      
      new CopyPlugin({
        patterns: [{ from: 'static' }],
      }),
      
      ...
    ],
  ```

  

## 03.Modules

###  CSS 적용

- css 파일을 적용할 때, 주로 enty 로 지정된 js 파일에 다음과 같이 import

- 이제 index.html 등 메인 html 파일에 **직접 link stylesheet를 설정할 필요 x**

  - 사용하지 않으므로 변수명은 생략

  ```js
  import './css/main.css';
  ```

- 하지만 js 파일에서는 css 파일을 파일 자체로 받아들일 뿐, 실제 css 를 읽지 못하므로 다음과 같이 loader 설치

### loader

: 번들링하기 전에 어떠한 조건에 해당하는 소스들을 bundler가 각각 어떻게 처리하면서 읽을 것인지 작성

```sh
npm i -D css-loader style-loader
```

	- css-loader: js에서 css를 읽을 수 있도록 
	- style-loader: js에서 읽은 css를 실제 html의 style 태그에 적용하도록

- webpack.config.js

  ```js
    module: {
      rules: [
        {
          // ! *.css 모든 파일 찾기
          test: /\.css$/,
          use: ['style-loader', 'css-loader'], // 순서 style-loader 부터
        },
      ],
    },
  ```

  

### SCSS 적용

```sh
npm i -D sass-loader sass
```

webpack.config.js

1. test: 정규표현식 `s?` 추가
2. use : sass-loader 추가

```js
  module: {
    rules: [
      {
        // ! *.css 모든 파일 찾기  // s 없거나 있거나
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // 순서 중요(뒤에서 부터 적용인 듯)
      },
    ],
  },
```

### autoprefixer

: 공급업체 접두사 붙이기(webkit 등)

```sh
npm i -D postcss autoprefixer postcss-loader 
```

- postcss : css 의 후처리
- autoprefixer: 공급업체 접두사를 붙여주는 
- postcss-loader: webpack에 적용

webpack.config.js

```js
  module: {
    rules: [
      {
        // ! *.css 모든 파일 찾기  // s 없거나 있거나
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], // 순서 중요(뒤에서 부터 적용인 듯)
      },
    ],
  },
```

package.json

```json
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
```

.postcssrc.js 생성

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ],
};
```

아래와 같은 코드

```js
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
  	autoprefixer,
  ],
};
```





## 03. babel

```sh
npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime babel-loader
```

.babelrc.js 생성

```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [['@babel/plugin-transform-runtime']], // 2차원 배열
};
```

