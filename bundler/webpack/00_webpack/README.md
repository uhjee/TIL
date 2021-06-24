# webpack

: 가장 널리 사용되고 있는 모듈 번들러

> 빌드, 번들링, 변환 모두 같은 의미로 사용

## 01. 정의

#### 모듈 번들러 module bundler

: 웹 어플리케이션을 구성하는 자원(HTML, CSS, JS, images, Font 등)을 모두 각각의 모듈로 보고, 이를 조합해서 병합된 하나의 결과물을 만드는 도구 

#### 모듈 module

: 특정 기능을 갖는 작은 코드 단위(HTML, CSS, JS, images, Font 등)

- 주로 파일 단위의 자바스크립트 모듈 관리

#### 웹팩으로 해결되는 문제들

- js 변수의 유효범위
- 브라우저별 HTTP 요청 숫자의 제약(크로스 브라우징)
- 사용하지 않는 코드 관리(tree shaking..?)
- dynamic loading & lazy loading 미지원

### 주요 개념

1. **Entry**

   : webpack에서 웹 자원을 번들하기 위해 필요한 최초 진입점이자 js 파일의 경로

   - entry 속성으로 지정된 js 파일에는 웹 어플리케이션에 대한 전반적인 구조와 내용이 담겨져 있어야 한다. 

   - e.g. 사용하려는 모듈들 import 선언 

     ```js
     // example
     import './assets/scss/index.scss';
     import './assets/css/icon-font/icons.css';
     import './assets/img/favicon.ico';
     ```

     

2. **Output**

   : 번들링 후의 결과물의 파일경로 의미

   - 객체 형태로 옵션 설정
   - `filename`은 필수, 보통 `path`까지 작성

3. **Loader**

   :css, image와 같은 js가 아닌 파일들을 webpackd 이 인식할 수 있도록 추가하는 속성

   - 로더는 오른쪽에서 왼쪽순으로 적용

   - 자주 사용되는 loader
     - Css loader
     - [Babel Loader](https://webpack.js.org/loaders/babel-loader/#root)
     - [Sass Loader](https://webpack.js.org/loaders/sass-loader/#root)
     - [File Loader](https://webpack.js.org/loaders/file-loader/#root)
     - [Vue Loader](https://github.com/vuejs/vue-loader)
     - [TS Loader](https://webpack.js.org/guides/typescript/#loader)

4. **Plugin**

   : webpack으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성

   - 웹팩 번들링 과정 전반에 대한 제어권을 갖고 있음.

   - 자주 쓰이는 plugrin

     - HtmlWebpackPlugin

     - [split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/)

     - [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

     - [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)

     - [webpack-bundle-analyzer-plugin](https://github.com/webpack-contrib/webpack-bundle-analyzer)

     - CopyWebpackPlugin 

       

## 02. 환경

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

> 정적 자원 static resource: image 등 동적으로 변경될 경우가 없는 자원들

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

: 번들링하기 전에 어떠한 조건에 해당하는 모듈들을 bundler가 각각 어떻게 처리하면서 읽을 것인지 작성

```sh
npm i -D css-loader style-loader
```

### 자주 사용 되는 loaders

- css-loader: js에서 css를 읽을 수 있도록 

- style-loader: js에서 읽은 css를 실제 html의 style 태그에 적용하도록

- file-loader: 파일을 로딩하는 loader. 실제 사용되는 파일만 복사

  css 내부의 url(bg.svg) 와 같이 파일을 불러올 때 사용

- url-loader: 아이콘과 같이 용량이 작거나, 반복해서 사용하지 않는 이미지들은 Data URI Scheme를 적용하기 위해 url-loader 사용

  limit 을 정해두어  사용



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

