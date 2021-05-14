# **typescript**

## **ch_001/ch_002** 
### 개발환경 설정

 - typescript package 설치

   ```shell
   npm i -g typescript
   ```

    -  `tsc`  키워드를 통해  `.js` 파일로 변환해주는 compiler

 - ts-node package 설치

   ```shell
   npm i -g ts-node
   ```

    -  `ts-node` 키워드를 통해 `.ts` 를 `.js` 로 변환해주고, node 환경에서 실행까지 시켜준다.

- 둘 다 개발환경 위에 설치하기 위해, `npm init` 후  `--save-dev` 또는 `-D` 로 재설치
- ts는 Promise 같은 개체도 알고 있지 않기 때문에 , `@types/node` 를 설치해야 한다.

### tsconfig.json : TS compiler config file  만들기

```shell
tsc --init
```

### package.json > script 추가

```json
  "scripts": {
    "dev": "ts-node src",
    "build" : "tsc && node dist"
  },
```

- dev: `src/index.ts` 를 컴파일 후 실행하는 역할
- build: 배포하기 위해, dist 디렉토리에 ES5 js file을 만들 때 사용(트랜스파일러 사용, babel)
- `npm run [script]` 형태로 사용

### module system

외부 패키지 import 하기

- 아래 package install

  ```shell
  > npm i -S chance ramda
  > npm i -D @types/chance @types/ramda
  ```

  - chance package : 가짜 데이터를 만들어주는데 사용
  - ramda: 함수형 유틸리티 패키지

- 크게 다를 게 없다. default로 제공하는 것은 전체로, export로 개체를 쪼개서 제공하는 것은 * 과 `as` 를 이용해 별칭을 주어서 전체를 받아 사용.

  ```javascript
  import Person, { makePerson } from './person/Person';
  import IPerson from './person/IPerson';
  import Chance from 'chance'; // export default 형태로 제공
  import * as R from 'ramda'; // 여러개의 export 문으로 제공
  
  const chance = new Chance();
  
  let persons: IPerson[] = R.range(0, 2).map((n: number) => new Person(chance.name(), chance.age()));
  
  console.log(persons);
  ```

### tsconfig.json 내부 살펴보기

**tsc 명령어**: ''옵션''과 ''대상파일''로 구성

```shell
Syntax:   tsc [options] [file...]
```

```json
{
  "compilerOptions": {
    "module": "commonjs", // browser: amd or node.js : commonjs
    "esModuleInterop": true, // amd 방식을 전제로 하는 라이브러리를 동작시키기 위한 플래그
    "target": "es5", // 트랜스파일할 대상의 js version(보통 es5)
    "moduleResolution": "node", // module이 commonjs : node or amd : classic
    "outDir": "dist", // 트랜스파일된 es5 js파일이 저장되는 디렉토리
    "baseUrl": ".", // 트랜스파일 후 디렉토리, tsconfig.json 파일 존재 디렉토리 기준
    "sourceMap": true, // 트랜스파일 디렉토리에 ".js.map" 파일 생성. 디버깅 용
    "downlevelIteration": true, // Generator 동작을 위한 플래그
    "noImplicitAny": false, // type을 지정하지 않으면 any 타입으로 간주하는 지 여부
    "paths": { "*": ["node_modules/*"] } // module -import 시 참조할 경로, 외부 패키지인 경우도 포함시키기 위해 node_modules 포함
  },
  "include": ["src/**/*"]
}

```

- `compilerOprions`: tsc 명령 형식의 옵션을 나타냄

- `include`: 대상파일 목록을 나타냄

  src 디렉토리와  src 하위 디렉토리의 모든 파일을 컴파일 대상으로 포함한다는 의미

**javascript 환경**

- 웹 브라우저 환경과 node.js 환경으로 분류
- 물리적으로 동작하는 방법이 다르기 때문에 , 모듈화된 javascript 또한 두 환경에서 다르게 동작
  - 웹 브라우저 : **AMD**(asynchronous module definition) 방식
  - node.js: **CommonJS** 방식

#  **ch_003** 객체, 타입



## 03-1 TS 변수 선언문

- **let, const** 

  - `const`는 초깃값 필수 명시

- **타입 주석 type annotation**

  - java의 타입과 달리 **소문자**로 명시

  - 포맷

  ```typescript
  let 변수이름: 타입 [= 초깃값]
  const 변수이름: 타입 = 초깂값
  ```

  예시코드

  ```typescript
  let n: number = 1
  let b: boolean = true
  let s: string = 'hello'
  let o: object = {}
  ```

- **타입 추론 type inference**

  ```typescript
  let n = 1 		// number로 추론
  let b = true	// boolean으로 추론
  let o = {}		// object로 추론
  ```

- **type 계층도**

  어떻게 그려야할 지 모르겠다 ...

  ```tex
  최상위 any
  ---
  중간
  + number, boolean, string (primitive)
  + object
  	+ interface, class
  ---
  최하위 undefined
  ```

  

- **any 타입**

  - 타입의 최상위

  - 어떤 타입의 데이터도  저장 가능

  ```typescript
  let a: any = 0
  a = 'hello'	// type error 발생 x
  a = true	// type error 발생 x
  a = {}		// type error 발생 x
  ```

- **undefined 타입**

  - `undefined` 자체가 **값**이자 **타입**

  - 최하위 타입

  ```typescript
  let u: undefined = undefined
  u = 1 // type error 발생
  ```

  

  ## 03-2 객체, 인터페이스

  - object 는 interface 와 class의 상위 타입

  - object 타입은 primitive를 제외하고 모든 object 타입 및 하위 타입을 담을 수 있다.

    ```typescript
    let o: object = {}
    o = {name: 'jee', age:5 }
    o = {height: 180, weight: 70} // 하지만, object 타입은 object의 property 타입 까지 정해두진 못함
    ```

  - **인터페이스 선언문**

    ```typescript
    interface 인터페이스이름 {
        prop이름[?]: prop타입[, ...]
    }
    ```

    ```typescript
    // interface 선언
    interface iPerson {
        name: string
        age: number
        height?: number // * optional prop
    }
    ```

    인터페이스 인스턴스 생성

    ```typescript
    let good1: iPerson = {name: 'jack', age: 35}
    let good2: iPerson = {name: 'shellby', age: 42}
    let good3: iPerson = {name: 'mark', age: 12, height: 159} // optional property
    
    let bad1: iPerson = {name: 'loopy'} // age 미존재
    let bad2: iPerson = {name: 'blonde', age: 20, weight: 79}  // 'weight' prop 정의 x
    ```

    

  - **익명 인터페이스 anonymous interface**

    - `interface` 키워드로 선언하지 않고, 사용부에서 익명으로 선언

      ```typescript
      let ai: {
          name: string
          age: number
          etc?: boolean
      } = { name: 'Jee', age: 50 }
      ```

    - 주로 함수를 구현할 때, 아래와 같이 **object 타입의 인자를 정의**할 때 사용

      ```typescript
      function printMe( me: {name: string, age: number, etc?: boolean} ) {
          console.log(
          	me.etc ? 
              	`${me.name} ${me.age} ${me.etc} ` :
              	`${me.name} ${me.age}`
          )
      }
      ```

      

