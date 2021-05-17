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
- new String() 와 같이  wrapper로 생성하지 않기를 권고(왜냐면 `typeof` 연산자의 결과가 object)
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

  - `undefined` 자체가 **값**이자 **타입**, 둘 다 소문자로 표기 (null 도 마찬가지임. **값**이자 **타입**)

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

      

## 03-2 객체와 클래스

### 클래스 선언문

- java 등의 객체지향 언어에서 제공하는 class, 접근제어자[private, public, protected], implements, extents 등과 같은 키워드 제공

```typescript
class 클래스이름 {
  [private | protected | public] 속성이름[?]: 속성타입[...]
}
```

클래스 선언과 인스턴스 생성

```typescript
class Person {
  public name: string;
  public age?: number;
}

let jack = new Person();
jack.name = 'jack';
jack.age = 30;
```

### 접근 제한자 access modifier

- 생략할 경우, `public` default

### 생성자 메소드 constructor

```typescript
// 생성자
class Person1 {
  constructor(public name: string, public age?: number) {}	// ! 접근제어자 붙여야 함
}

const joy = new Person1('joy', 31);
```

- 접근제어자를 붙여줄 경우, 프로터피로 직접 선언 및 할당을 하지 않아도 된다. () javscript와 같이 `this.프로퍼티 = 매개변수` 를 적어주지 않아도 된다. )

- 사실 아래처럼 펼쳐진 class 선언문을 위와 같이 함축한 것

  ```typescript
  
  class Person2 {
    name: string;	//생략
    age?: number;	//생략
    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

### 인터페이스 구현 interface implements

```typescript
class 클래스이름 implements 인터페이스이름 {
  ..
}
```

- 인터페이스는 규약(spec) 을 정의해놓은 것일 뿐, 직접 구현은 구현해야하는 class에서 해야한다.

예제

```typescript
// 인터페이스 정의
interface IPerson3 {
  name: string;
  age?: number;
}

// 인터페이스 구현 (생성자 메소드)
class Person3 implements IPerson3 {
  constructor(public name: string, public weight: number, public age?: number) {}
}

let phil = new Person3('phil', 70, 29);

```



### 추상 클래스 abstract class

```typescript
abstract class 클래스이름 {
  abstract 속성이름: 속성타입
  abstract 메소드이름() { }
}
```

- 추상 클래스는 new 키워드로 인스턴스를 생성할 수 없다.

### 클래스 상속 class extends

```typescript
class 서브클래스 extentds 수퍼클래스 {
	...
}
```

```typescript

// 추상 클래스 정의
abstract class Abstractperson5 {
  abstract name: string;
  constructor(public age?: number) {}
}

// 클래스 정의 및 추상 클래스 상속
class Person5 extends Abstractperson5 {
  constructor(public name: string, age?: number) {
    super(age); // super 키워드 - 부모의 생성자 호출
  }
}

// 인스턴스 생성
const ruru = new Person5('ruru', 52);
console.log(ruru);

```

### static 속성

- 모든 인스턴스가 공유하는 속성

```typescript
class 클래스이름 {
  static 정적속성이름: 속성타입
}
```

- `클래스이름.정적속성이름` 형태의 **dot notation**(점 표기법)을 통해 get, set 가능
- javascript 의 스태틱 메소드 & 프로토타입 메소드 개념 생각하기

```typescript
class Book {
  static initValue = 1000;
  constructor(public title: string, public author: string) {}
}

const book1 = new Book('javascript_dev', 'zeroxho');
console.log(book1);
console.log(Book.initValue);  // 클래스이름. 으로 접근, 인스턴스 변수명 x
```

### 비구조화 할당 destructuring

ES5 의 개념과 동일

```typescript
interface IAnimal {
  name: string;
  legs: number;
}

const dog: IAnimal = { name: 'dog', legs: 5 };

// 비구조화 할당
let { name, legs } = dog;
```



### 나머지 연산자 rest operator & 펼침 연산자 spread operator

- 나머지 연산자

  ```typescript
  const address: any = {
    country: 'Korea',
    city: 'Seoul',
    address1: 'Gangnam',
    address2: '676-23',
  }
  
  // 나머지 연산자
  const {country, city, ...detail} = address;
  ```

- 펼침 연산자

  ```typescript
  const obj1: object = {
    name: 'rock',
    age: 39
  }
  
  const obj2: object = {
    country: 'England',
    language: 'Eng'
  }
  
  const obj3: object = {...obj1, ...obj2}
  ```



---

## 03-5 객체의 타입 변환

### 타입 변환 type conversion

- 형변환과 비슷한 말인 듯

```typescript
const obj1: object = {
  name: 'd loopy',
  age: 20,
};

console.log(obj1);

console.log(obj1.name);   // object 타입에는 name 프로퍼티가 없어서 오류 발생
console.log((<{ name: string }>obj1).name); // 형변환
```

- type conversion, type casting, type coercion 모두 유사한 개념
  - **type convetsion(**명시, 묵시 개념 포함) / **type castring(**명시적) / **type coercion**(묵시적)



### 타입 단언 type assertion

- javascript 의 타입 변환 구문과 구별하기 위해 **단언**이라는 용어 사용

- 두 가지 형태로 사용이 가능하다. 내용은 동일

  ```typescript
  (<타입>인스턴스명)   // 타입 단언 방법 1
  (인스턴스명 as 타입)	// 타입 단언 방법 2
  ```

  ```typescript
  interface INameable {
    name: string;
  }
  
  let obj5: object = {
    name: 'jack',
  };
  
  let name1 = (<INameable>obj5).name; // 타입 단언 1
  
  let name2 = (obj5 as INameable).name; // 타입 단언 2
  ```

  

# ch_004 함수와 메소드

## 04-1. 함수 선언문 Function Declarations

```typescript
function 함수이름(매개변수1: 타입1, 매개변수2: 타입2[, ...]) : 반환값 타입 {
  ...
}
```

```typescript
function add(a: number, b: number): number {
  return a + b
}
add(1, 2)
```

### 매개변수 및 반환값의 type annotation

- 매개변수의 타입과 함수의 반환값에 대한 type annotation 을 생략할 수는 있지만, 그렇게 사용하지말자

### void 타입

- 반환 값이 없는 함수의 반환 타입. java와 같은 개념인 듯
- 단순히 내부 로직을 실행만 하는 역할

```typescript
function printMe(me: {name: string, age: number}): void {
  console.log(`${name}, ${age}`)
}
```



### 함수 시그니쳐 function signature

변수에 타입이 있듯, 함수를 담는 변수(?)에도 타입이 있다. => function signature

```typescript
(매개변수1 타입, 매개변수2 타입[, ...]) => 반환값 타입
```

- string 타입 매개변수를 받고, void 반환

  ```typescript
  const printMe: (value: string) => void = function (str: string): void {
    console.log(str);
  };
  ```

  

- Person 타입 매개변수로 받고, string 반환

  ```typescript
  const introduceMe: (me: Person) => string = (me: Person): string => `이름은 ${me.name}, 나이는 ${me.age}`;
  ```

### 타입 별칭 type alias

- type 키워드는 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용할 수 있도록 함

- ```typescript
  type 새로운타입 = 기존타입
  ```

  ```typescript
  // 타입 alias
  type numberFunc = (num1: number, num2: number) => number;
  
  const add: numberFunc = (a: number, b: number) => a + b;
  const multifi: numberFunc = (a: number, b: number) => a * b;
  ```

  

### undefined 관련 주의 사항

- undefined는 모든 타입의 서브 타입이기 때문에, 제대로 처리하지 않으면 javascript와 같은 오류가 발생한다.

```typescript
interface IAgeable {
  age?: number
}

const getAge: (o: IAgeable) => number = (o: IAgeable) : number => {
  return o.age;	
}

getAge(undefined); // Type 'number | undefined' is not assignable to type 'number'.

```



- undefined 처리

  ```typescript
  interface IAgeable {
    age?: number;
  }
  
  const getAge: (o: IAgeable) => number = (o: IAgeable): number => {
    return o !== undefined && o.age ? o.age : 0;  // 삼항
  };
  
  ```

  

### 선택적 매개변수 optional parameter

```typescript
function fn(arg1: string, arg?: number): void {}
```

아래와 같이 함수 시그니처에도 `?` 를 붙인다.

```typescript
type OptionalArgFunc = (arg1: string, arg?: number) => void
```



## 04-2 함수 표현식 Function Expressions

- javascript에서 함수는 Function 클래스의 인스턴스다.
- javascript 함수 또한 객체이다. (일급함수)

### 일등 함수, 일급 함수 first-class function

- functional programming의 조건
- 함수 자체는 데이터로써 변수, 다른 함수의 매개변수, 리턴값이 될 수 있다.

### 표현식 expression

- 하나의 값으로 대변되는 식

### 계산법, 평가  Evaluation

- 컴파일러는 실행 흐름대로 내려가다가 **표현식**을 만나면 계산법을 적용해 하나의 어떤 값으로 만들어 간다.

- 계산, 평가 하는 방법은 다음 두 가지로 나뉜다.

  1. eager evaluation, 조급한 계산법

  2. lazy evaluation, 느긋한 계산법: 함수 표현식일 경우, 바로 평가하지 않고, 표현식 자체를 가지고 다니며, 이후 모든 인자를 알 수 있을 때까지 평가를 보류한다.

     ```typescript
     const getAge = (age: number) :number => age * 10 // getAge라는 변수에 담겨 평가되지 않고 있다가 이후 호출될 때, 평가된다.
     ```

### 익명 함수 anonymous function

IIFE 등, 연산자 우선순위(operator precedence)를 고려해 코드를 분해

```typescript
((a, b) => {
  return a * b;
})(1, 2) // 3
```



## 04-3. 화살표 함수와 표현식 문

### arrow function

```typescript
const 함수_이름 = (arg1: type, arg2: type[, ...]) : 반환타입 => { ... }
```

### 표현식 문

- 실행문 방식 execution statement

  ```typescript
  const arrow1 = (a: number, b:number) => { return a + b }
  ```

- **표현식 문** expression statement

  화살표 이후부터가 실행문 이자 그 자체가 하나의 값

  ```typescript
  const arrow2 = (a: number, b: number) => a + b
  ```

  - typescript에서는 관습적으로 표현식 문에 세미콜론을 붙이지 않는다.



// 100 page 까지 했다.