# 07 바벨과 웹팩 자세히 들여다보기



## 7.1.1 바벨을 실행하는 여러가지 방법

1. `@babel/cli` 실행
2. 웹팩에서 babel-loader 설정 후 실행
3. `@babel/core` 직접 실행
4. `@babel/register` 실행
   - node.js의 `require` 코드가 실행될 때 동작 -> react 쓰면서 사용할 일이 거의 없다.

### babel 이란

- 입출력이 모두 javascript 코드인 컴파일러(트랜스파일러)
- 초기에는 ES6 코드를 ES5 코드로 변환해주는 컴파일러
- 현재는 react의 JSX, TS의 정적 타입 언어, 코드 압축, proposal 단계에 있는 문법 등을 사용할 수 있음
- babel6 까진 `.babelrc` 파일로 설정값 관리 / babel7 이후로는 `babel.config.js` 파일로 관리하는 것 추천

### 001. @babel/cli 로 실행 

1. 설치

   ```sh
    npm install @babel/core @babel/cli @babel/plugin-transform-arrow-functions @babel/plugin-transform-template-literals @babel/preset-react    
   ```

2. src/code.js 에 테스트 작성

   ```js
   const element = <div>babel test</div>;
   const text = `element type is ${element.type}`;
   const add = (a, b) => a + b;
   ```

3. 변환

   

   ```sh
   npx babel src/code.js --presets=@babel/preset-react --plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions
   ```

4. 결과

   ```js
   PS C:\personal\TIL\react\book-react\ch_07\01-babel-start> npx babel src/code.js --presets=@babel/preset-react --plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions
   const element = /*#__PURE__*/React.createElement("div", null, "babel test");
   const text = "element type is ".concat(element.type);
   
   const add = function (a, b) {
     return a + b;
   };
   ```

   

### babel.config.js

- babel7 부터 js파일로 관리

  ```js
  // babel 설정 파일 (babel7 이후로 js 파일로 관리)
  
  const presets = ['@babel/preset-react'];
  const plugins = [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
  ];
  
  module.exports = { presets, plugins };
  ```

- 이후 다음과 같이 컴파일 실행 시, 적용 (파일 출력 시)

  ```sh
  npm babel src/code.js --out-file dist.js
  ```



### 02. webpack _ babel-loader 실행하기

1. webpack, cli, babel-loader  설치

   ```sh
   npm install webpack webpack-cli babel-loader
   ```

   

2. webpack.config.js 생성

   ```js
   const path = require('path');
   
   module.exports = {
     entry: './src/code.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'code.bundle.js',
     },
     modules: {
       rules: [
         {
           test: /\.js$/,
           use: 'babel-loader',
         },
       ],
       // optimization: { minimizer: [] },
     },
   };
   ```

   

### 03. @babel/core 직접 사용하기

- 장점
  - 바벨을 좀 더 효율적으로, 유연하게 실행할 수 있다.

1. root에 runBabel.js 생성

   ```js
   const babel = require('@babel/core');
   const fs = require('fs');
   
   // compile할 파일 가져오기
   const filename = './src/code.js';
   const source = fs.readFileSync(filename, 'utf8');
   
   // babel 설정
   const presets = ['@babel/preset-react'];
   const plugins = [
     '@babel/plugin-transform-template-literals',
     '@babel/plugin-transform-arrow-functions',
   ];
   
   // @babel/core의 함수 사용
   const { code } = babel.transformSync(source, {
     filename,
     presets,
     plugins,
     configFile: false,
   });
   
   console.log(code);
   
   ```

   

- babel의 컴파일 단계

  1. parse

     입력된 코드로부터 AST(abstract syntax tree) 생성

  2. transform

     AST를 원하는 형태로 변환

  3. generate

     AST를 코드로 출력



- AST 상태를 재사용하는 코드

  ```js
  const babel = require('@babel/core');
  const fs = require('fs');
  
  // compile할 파일 가져오기
  const filename = './src/code.js';
  const source = fs.readFileSync(filename, 'utf8');
  
  // babel 설정
  const presets = ['@babel/preset-react'];
  
  // code 생성이 아닌, ast만 생성
  const { ast } = babel.transformSync(source, {
    filename,
    ast: true,
    code: false,
    presets,
    configFile: false,
  });
  
  const { code: code1 } = babel.transformFromAstSync(ast, source, {
    filename,
    plugins: ['@babel/plugin-transform-template-literals'],
    configFile: false,
  });
  
  const { code: code2 } = babel.transformFromAstSync(ast, source, {
    filename,
    plugins: ['@babel/plugin-transform-arrow-functions'],
    configFile: false,
  });
  
  console.log(code1);
  console.log(code2);
  
  ```

  

### 7.1.2 확장성과 유연성을 고려한 바벨 설정 방법

- extends

  다른 설정 파일을 가져와서 확장

  ```json
  {
    "extends": "../../common/.babelrc", // 다른 파일 설정 가져오기
    "plugins": [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-template-literals" // 중복될 경우 overriding
    ]
  }
  
  ```

  

- env

  **환경**별 다른 설정 적용 가능

  ```js
  {
    "presets": ["@babel/preset-react"],
    "plugins": [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-template-literals"
    ],
    "env": {
      "production": { // 배포 환경
        "presets": ["minify"]
      }
    }
  }
  ```

  

  -  overrides

    **파일**별로 다른 설정 적용 가능

    ```js
    {
      "presets": ["@babel/preset-react"],
      "plugins": ["@babel/plugin-transform-template-literals"],
      // 파일 별로 다른 설정 가능
      "overrides": [
        {
          "include": "./service1",
          "exclude": "./service1/code2.js",
          "plugins": ["@babel/plugin-transform-arrow-functions"]
        }
      ]
    }
    
    ```

    

### 7.1.3 전체 설정 파일과 지역 설정 파일

전체

- babel.config.js :: 모든 js 파일에 적용

지역 설정: 같은 설정은 지역설정이 overriding

- .babelrc
- .babelrc.js
- package.json

### 7.1.4 바벨과 polyfill

### polyfill

- 오래된 브라우저를 지원하기 위해 바벨로 코드 문법을 변환하는 동시에 폴리필도 사용 필요
- 런타임에 기능이 존재하는지 검사해서 기능이 없는 경우에만 주입
- 컴파일 시 변환이 되는 기능과 그렇지 않고 런타임에 주입되어 사용하는 기술이 있다.
  - ES8 : String.padStart 등
  - 컴파일 시, 변환 필요 예시 : async - await

### core-js 모듈의 모든 폴리필 사용하기

- `import 'core-js'`

  단순히 import 하는 것만으로 모든 폴리필이 포함됨

- 웹팩 사용하는 경우

  - entry로 설정

  ```js
  module.exports = {
      entry: ['core-js', './src/index.js'],
      // ...
  };
  ```

  - 파일 크기에 민감판 프로젝트라면, `core-js/features` 내부에서 필요한 기능만 가져다가 쓸 수 있다.

### @babel/preset-env 프리셋 이용하기

- 실행 환경에 대한 정보를 설정해두면, 자동으로 필요한 기능을 주입해준다.

- 예시 - 특정 버전의 브라우저를 위한 플러그인 포함

  ```js
  const presets = [
      [
          '@babel/preset-env',
          {
         	 targets: '> 0.25%, not dead', // 지원하는 브라우저 정보 입력
          },
      ],
  ]；
  module.exports = { presets };
  ```

  

## 7.2 바벨 플러그인 제작하기

바벨은 프리셋과 플러그인을 제작할 수 있는 API 제공

### 7.2.1 AST 구조 들여다 보기

바벨은 문자열로 입력되는 코드를 AST : abstract syntax tree 라는 구조체로 변환해 처리

[https://astexplorer.net/](https://astexplorer.net/)

- 위 사이트에서 AST 구조 확인 가능
- 바벨은 babylon 이라는 parser를 사용해 AST 를 만든다.
- AST 의 각 노드는 **type** 이라는 속성이 있다.
### console.log 제거 플러그인

./plugins/remove-log.js

```js
module.exports = function ({ types : t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        // Expressionstatement 노드가 생성되면 호출되도록 메소드 등록
        if (t.isCallExpression(path.node.expression)) {
          // Expressionstatement 노드의 expression 속성이 CallExpression인지 검사
          if (t.isMemberExpression(path.node.expression.callee)) {
            // callee 속성이 MemberExpression 노드인지 검사
            const memberExp = path.node.expression.callee;
            if (
              memberExp.object.name === 'console' &&
              memberExp.property.name === 'log' // console 객체의 log 메소드가 호출된 것인지 검사
            ) {
              path.remove(); // AST에서 Expressionstatement 노드 제거
            }
          }
        }
      },
    },
  };
};

```

babel.config.js

```js
const plugins = ['./plugins/remove-log.js'];
module.exports = { plugins };

```



## 7.3 웹팩 초급편

### webpack

: 모듈 번들러

- 모듈: 각자 하나의 리소스 파일
- 번들: 웹팩 실행 후의 결과 파일

### 7.3.2 로더 사용하기

- 모듈(파일)을 입력받아 원하는 형태로 변환한 후, 새로운 모듈을 출력해주는 함수
- js 파일 뿐만 아니라, 이미지 파일, CSS 파일, CSV 파일 등 모든 파일은 모듈

#### babel-loader

babel.config.js

```js
const presets = ['@babel/preset-react'];
module.exports = { presets };
```

webpack.config.js

```js
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
    ],
  },
  mode: 'production'
};

```



#### CSS loader

- js 파일에 import 된 .css 파일들을 css 객체로 만들어 준다.
- css-module 역시 css-loader 가 제공하는 기능
- 그 외에 css 파일 내에서 사용하는 `@import`, `url()` 등의 처리 

./src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Style from './App.css';   // js 에서는 css 파일을 읽을 수 없기 때문에 에러 발생

console.log({Style}); // js 에서는 css 파일을 읽을 수 없기 때문에 에러 발생

function App() {
  return (
    <div className="container">
      <h3 className="title">webpack example</h3>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

```
npm intall css-loader
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
			// ...
      // css-loader
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
  mode: 'production',
};
```

- 이제는 콘솔에 Style 객체가 출력된다.
- css-loader는 js파일에서 css 파일을 읽을 수 있도록 해주는 패키지

- 하지만 실제 html element에는 적용되지 않는다.

#### style-loader

- css-loader 가 만든 css 객체를 **style 태그로 만들어서 html head에 삽입**한다.
- style-loader는 번들 파일이 **브라우저에서 실행될 때** style 태그 삽입

```js
npm install style-loader
```

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
			// ...
      // css-loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'production',
};
```

#### 기타 파일 처리하기

- txt 파일, png 파일

  ```js
  npm install file-loader raw-loader
  ```

  ```js
  const path = require('path');
  
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
  			// ..
        {
          test: /\.(png|jpg|gif)$/,
          use: 'file-loader',
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
        },
      ],
    },
    mode: 'production',
  };
  
  ```

  

- json 파일은 webpack 에 기본 내장

#### image 파일 요청 횟수 줄이기

```sh
npm install url-loader
```

webpack.config.js

```js
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          oprtions: {
            limit: 8192, // 파일 크기가 이 값보다 큰 경우 다른 로더가 처리하도록 fullback 옵션 제공
          },
        },
      },
```

### 7.3.3 webpack 플러그인 사용하기

- plugin: 각 모듈을 하나로 합친 번들에 대한 처리 담당
- loader: 특정 모듈(file)에 대한 처리만 담당

#### html-webpack-plugin

- html 파일 수동 작성의 불편함

  - 웹팩을 실행해서 나오는 결과물을 확인하기 위해서는 HTML 파일을 수동으로 작성해야 함
    - ex) dist 폴더 하위에 index.html 생성해야 함

  - 번들 파일 이름에 **[chunkhash]** 옵션을 설정했기 때문에, 번들파일이 변경될 때마다 html 파일 내용도 수정해야함

webpack.config.js

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  /** ---------------ENTRY----------------- */
  entry: './src/index.js',
  /** ---------------OUTPUT----------------- */
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  /** ---------------LOADER----------------- */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  /** ---------------PLUGINS----------------- */
  plugins: [
    // 01-1. webpack이 실행될 때, dist 폴더를 정라하는 플러그인
    new CleanWebpackPlugin(),
    // 01-2. index.html 자동 생성하는 플러그인
    new HtmlWebpackPlugin({
      template: './template/index.html', // 자동 생성 시, 우리가 원하는 template대로 생성하도록
    }),
  ],
  mode: 'production',
};

```

template/index.html

```html
<html>
  <head>
    <title>웹팩 플러그인 예제</title>
  </head>
  <body>
    <div id="root" />
  </body>
</html>
```

#### DefinePlugin

- 모듈 내부에 있는 문자열을 대체해주는 플러그인
- webpack에 내장된 플러그인이기 때문에 별도 설치 필요 없음

src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div>
      <p>{`앱 버전은 '${APP_VERSION}' 입니다.`}</p>
      <p>{`10 * 10 = ${TEN * TEN}`}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

```

webpack.config.js

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  /** ---------------ENTRY----------------- */
  entry: './src/index.js',
  /** ---------------OUTPUT----------------- */
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  /** ---------------LOADER----------------- */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  /** ---------------PLUGINS----------------- */
  plugins: [
    // 02. 문자열 대체 플러그인
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('1.2.3'),
      TEN: '10',
    }),
  ],
  mode: 'production',
};

```



#### ProvidePlugin

- 자주 사용되는 모듈은 항상 import 키워드를 사용해 가져와야 함 -> 귀찮음
- 미리 설정된 모듈을 자동으로 등록해준다.
- webpack 에 기본 내장되어 있어 별도 설치 필요 없음

src/index.js

```jsx
// import React from 'react';         // ------ react 모듈 import 주석 처리
import ReactDOM from 'react-dom';

function App() {
  return (
    <div>
      <h3>안녕하세요, 웹팩 플러그인 예제입니다.</h3>
      <p>html-webpack-plugin 플러그인을 사용합니다.</p>
      <p>{`앱 버전은 '${APP_VERSION}' 입니다.`}</p>
      <p>{`10 * 10 = ${TEN * TEN}`}</p>
    </div>
  );
}

ReactDOM.render(<App />, $('#root')[0]); // ---- jQuery 사용 (import 안함)
```

webpack.config.js

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  /** ---------------ENTRY----------------- */
  entry: './src/index.js',
  /** ---------------OUTPUT----------------- */
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  /** ---------------LOADER----------------- */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  /** ---------------PLUGINS----------------- */
  plugins: [
    // 03. 미리 전역으로 모듈 등록
    new webpack.ProvidePlugin({
      React: 'react',
      $: 'jquery',
    }),
  ],
  mode: 'production',
};
```

---

## 7.4 webpack 고급편

### 7.4.1 Tree Shaking

- 불필요한 코드를 제거해주는 기능
- webpack은 기본적으로 tree shaking 기능을 제공

- 다음의 경우에는 tree shaking 동작하지 않음
  - 사용되는 모듈이 ESM(ECMA Script Modules)이 아닌 경우
  - 사용하는 쪽에서 ESM이 아닌 다른 모듈 시스템을 사용하는 경우
  - 동적 임포트(Dynamic Import)는 사용하는 경우

#### 외부 패키지 tree shaking

- 예를 들면 lodash 패키지는 ESM으로 되어있지 않기 때문에, tree shaking으로 제거되지 않는다.

잘못된 사용 예

```js
import { fill } from 'lodash';	// 모든 lodash 코드 포함함
const arr = [1, 2, 3];
fill(arr, 'a');
```

올바른 사용 예

- lodash 패키지에는 ESM 모듈 시스템을 사용하는 **lodash-es** 패키지를 별도로 제공하고 있음

```js
import { fill } from 'lodash-es';
```

#### 바벨 사용 시 주의할 점

- 바벨로 컴파일한 이후에도 ESM 문법으로 남아있도록 해야한다.

babel.config.js 

```js
const presets = [
  [
      '@babel/preset-env',
      {
          // ...
          modules: false,   // 모듈 시스템이 변경되지 않도록 설정
      }
  ]  
];
```

### 7.4.2 코드 분할

- 어플리케이션 전체 코드를 하나의 번들 파일로 만드는 것이 좋지 않을 수도 있다.
- 불필요한 코드까지 전송되어 사용자 요청으로부터 렌더링되기 까지 오랜 시간이 걸릴 수 있음
- 다수의 사용자를 대상으로 하는 서비스라면 응답 시간을 최소화하기 위해 코드 분할하는 게 좋음

webpack.config.js

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // code split을 위해 entry 파일을 각각 입력
  entry: {
    page1: './src/index1.js',
    page2: './src/index2.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()],
  mode: 'production',
};
```

- index1, index2 모두 같은 내용을 담고 있기 때문에 비효율적

#### SplitChnksPlugin

- webpack 내장 코드 분할 플러그인

webpack.config.js

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // code split을 위해 entry 파일을 각각 입력
  entry: {
    page1: './src/index1.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    // 코드 분할 설정
    splitChunks: {
      chunks: 'all', // 동적 임포트가 아니더라도 코드 분할되도록
      name: 'vendor',
    },
  },
  mode: 'production',
};

```

- splitChunks 속성의 기본값

  ```js
  module.exports = {
    // ...
    optimization: {
      splitChunks: {
        chunks: 'async', // --- 동적 임포트만 코드를 분할하도록 설정
        minSize: 30000,  // file szie 30kb 이상인 모듈만 분할 대상
        minChunks: 1,    // 한 개 이상의 chunk에 포함되어 있어야 함
        // ...
        cacheGroups: {   // 파일 분할은 그룹별로 이뤄짐 (기본적으로 내부모듈default과 외부모듈vendors)
            default: {
                minChunks: 2,  // 내부 모듈은 두 개 이상의 번들 파일에 포함되어야 분할 처리
                prioity: -20,
                reuseExistingChunk: true,
            },
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
                priority: -10,
            },
        },
      },
    },
    mode: 'production',
  };
  
  ```

#### 동적 임포트 dynamic import

- 동적으로 모듈을 가져올 수 있는 기능
- 웹팩에서 동적 임포트를 사용하면 해당 모듈의 코드는 자동으로 분할되며, 오래된 브라우저에서도 잘 동작함
- javascript 표준이 될 것이 유력(stage 3)

```js
function myFunc() {
  import('./util').then(({ add }) =>
    import('lodash').then(({ default: _ }) =>
      console.log('value', _.fill([1, 2, 3], add(10, 20))),
    ),
  );
};

myFunc();
```

- import 함수를 사용하면 동적으로 모듈을 가져올 수 있다.
- import 함수는 Promise 객체를 반환한다.

Promise.all() 메소드 사용한 동적 임포트

```js
async function myFunc() {
  const [{ add }, { default: _ }] = await Promise.all([
    import('./util'),
    import('lodash'),
  ]);
  console.log('value', _.fill(new Array(3).fill(1), add(30, 20)));
}
myFunc();

```

#### 분할된 파일을 prefetch, preload로 빠르게 가져오기

- 만약 동적 임포트를 하는 함수가 특정 이벤트의 핸들러로 사용된다면, 해당 이벤트가 발생하기 전에는 모듈을 임포트하지 않음 => 꼭 필요할 때만 모듈을 가져오기 때문에 게으른 로딩(**lazy loading**)이라고 불림
- 번들 파일의 크기가 큰 경우에는 응답 속도가 느리다는 단점 존재
- webpack에서 제공하는 **prefetch**, **preload** 기능 활용
  - **prefetch**: 가까운 미래에 필요한 파일이라고 브라우저에게 알려주는 기능
    - 브라우저가 바쁘지 않을 때 미리 다운로드
  - **preload**: 지금 당장 필요한 파일이라고 브라우저에게 알려주는 기능
    - 첫 페이지 로딩 시 즉시 다운로드 -> 남발할 경우, 첫 페이지 로딩 속도 느려짐

```js
async function myFunc() {
  await new Promise((res) => setTimeout(res, 1000)); // 1초 지연
  const [{ add }, { default: _ }] = await Promise.all([
    import(/* webpackPreload: true */ './util'),
    import(/* webpackPrefetch: true */ 'lodash'),
  ]);
  console.log('value', _.fill(new Array(3).fill(1), add(30, 20)));
}
myFunc();
```



### 7.4.3 loader 제작하기

csv 모듈 loader 제작

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.csv$/,
        use: './my-csv-loader',    // custom-loader
      },
    ],
  },
  mode: 'production',
};

```

my-csv-loader.js

```js
// laoder는 모듈의 내용을 문자열로 입력받는 함수
module.exports = function (source) {
  const result = { header: undefined, rows: [] }; // 모듈을 사용하는 쪽에서 받게 될 데이터
  const rows = source.split('\n');
// 문자열 parsing
  for (const row of rows) {
    const cols = row.split(',');
    if (!result.header) {
      result.header = cols;
    } else {
      result.rows.push(cols);
    }
  }
  return `export default ${JSON.stringify(result)}`;
};

```

member.csv

```csv
index,name,age
1,mike,23
2,john,26
3,uhjee,33
```

### 7.4.4 플로그인 제작하기

webpack의 처리 과정을 이해해야 작성할 수 있기 때문에 loader보다 작성이 어려움

`DefinePlugin` 처럼 플러그인은 모듈의 내용도 수정할 수 있기 때문에, loader가 할 수 있는 거의 모든 일을 할 수 있음

my-plugin.js

```js
// plugin 은 class 로 정의 가능
class MyPlugin {
  // webpack.config.js 에서 설정한 옵션이 생성자 매개변수로 넘어옴
  constructor(options) {
    this.options = options;
  }

  // webpack의 각 처리 단계에서 호출될 콜백함수 등록
  apply(compiler) {
    // webpack 실행 완료시
    compiler.hooks.done.tap('MyPlugin', () => {
      console.log('bundling complted!');
    });

    // webpack이 결과 파일을 생성하기 직전에 호출
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      let result = '';
      for (const filename in compilation.assets) {
        if (this.options.showSize) {
          const size = compilation.assets[filename].size();
          result += `${filename}(${size})\n`;
        } else {
          result += `${filename}\n`;
        }
      }

      // webpack이 생성할 파일들의 목록
      compilation.assets['fileList.txt'] = {
        source: function () {
          return result;
        },
        size: function () {
          return result.length;
        },
      };
    });
  }
}

module.exports = MyPlugin;
```

webpack.config.js

```js
const path = require('path');
const MyPlugin = require('./my-plugin');

module.exports = {
  entry: {
    app1: './src/index1.js',
    app2: './src/index2.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // apply custom plugin
  plugins: [new MyPlugin({ showSize: true })],
  mode: 'production',
};

```

