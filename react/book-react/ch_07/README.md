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

