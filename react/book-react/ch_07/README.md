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



















