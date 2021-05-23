## <a id="ch_004">ch_004 함수와 메소드</a>



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

함수 호출 시 인자를 전달하지 않으면, **undefined**로 고정

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



## 04-4. 일등 함수 

### 콜백 함수 callback function

- first-class function 기능을 제공하는 언어에서 함수는 '함수 표현식' 이라는 일종의 데이터
- 따라서 함수 자체를 변수에 담을 수 있고, 매개변수로 받을 수도 있고, 반환값으로 사용할 수 있다.
- 이 때, 매개변수 형태로 동작하는 함수를 **콜백 함수(callback function)**라고 부른다.

```javascript
const f = (callback: () => void): void => callback()
```

#### 예제

```typescript
export const init = (cb: () => void ): void => {
  console.log('1. default initialization finished.')
  callback()
  console.log('3. all initialization finished.')
}
```



```typescript
// 함수 평가(호출)
import { init } from './init'
init(() => console.log('2. custom initialization finished.')) // 익명 함수로 cb 함수 전달하며 호출
```



```typescript
// 실행결과
// 1. default initialization finished.
// 2. custom initialization finished.
// 3. all initialization finished.
```



### 중첩 함수 nested function

- 함수 안에서 또 다른 함수를 중첩해서 구현

  ```typescript
  const calc = (value: number, cd: (number) => void): void => {
    // 중첩 함수 구현
    let add = (a, b) => a + b
    function multiply(a, b) {return a * b}
    
    let result = multiply(add(1, 2), value)
    // cb 평가(호출)
    cb(result)
  }
  
  calc(30, (result: number) => console.log(`result is ${result}`)) // result is 90
  ```

  

### 고차 함수 high-order function

- 또 다른 함수를 **반환**하는 함수
- 함수형 프로그래밍에서 함수 또한 하나의 값이므로, 반환값이 될 수 있다.

```typescript
type NumberToNumberFunc = (arg: number) => number;

const add = (a: number): NumberToNumberFunc => {
  // NumberToNumberFunc 타입의 함수 반환하는 중첩함수
  const _add: NumberToNumberFunc = (b: number): number => {
    // number 타입 반환
    return a + b; // 클로저: 비공개변수 a를 갖는 환경
  };
  return _add;
};

add(1)(5) // 6
```



```typescript
const multiply = (a: number) => (b: number) => (c: number) => a * b * c;

const result = multiply(1)(2)(3);
console.log(result);
```



## 04-5. 함수 구현 기법

es6 등에서 사용가능한 문법은 typescript에서도 그대로 사용 가능

### 매개변수 기본값 지정

- 함수 호출 시, 인자(arg)를 전달하지 않더라도, 매개변수(param)에 어떤 값을 설정하고 싶다면, 매개변수의 기본값을 지정할 수 있다.

```typescript
(매개변수: 타입 = 매개변수_기본값)
```

#### 예제

```typescript
// 매개변수 기본값
export type Person1 = { name: string; age: number };

export const makePerson = (name: string, age: number = 10): Person1 => {
  const person = { name: name, age: age };
  return person;
};

console.log(makePerson('jeejeejee', 30));	// { name: 'jeejeejee', age: 30 }
console.log(makePerson('jeejeejee'));			//{ name: 'jeejeejee', age: 10 } -- default
```



### 객체 리터럴 프로퍼티 단축 구문

- 변수(매개변수) 명과 생성하려는 객체의 property 명이 같다면, 생략 가능

```typescript
export const makePerson = (name: string, age: number = 10): Person1 => {
  const person = { name, age };
  return person;
};
```



### 객체 리턴 시 구문

- 함수 리터럴의 중괄호와 객체 리터럴의 중괄호가 겹쳐 헷갈리므로, 괄호로 묶어준다.

```typescript
export const makePerson = (name: string, age: number = 10): Person1 => ({ name, age });
```



### 매개변수에 비구조화 할당문 사용

```typescript
export type Person1 = { name: string; age: number };

// arguments 비구조화 할당문 사용
const printPerson = ({ name, age }: Person1): void => 
	console.log(`name: ${name}, age: ${age}`);

printPerson({ name: 'ayoung', age: 19 });
```



### 색인 가능 타입 indexable type

- `{ [key]: value }`  형태의 타입을 색인 가능 타입이라 칭함

- 다음과 같은 형태로 key, value 타입 명시

  ```typescript
  type KeyType = {
    [key: string]: string
  }
  ```

  

예제

```typescript
// 색인 가능 타입 indexable type 지정
export type KeyValueType = {
  [key: string]: string;
};

export const makeObject = (key: string, value: string): KeyValueType => ({ [key]: value });

console.log(makeObject('name', 'jeechan'));	 // { name: 'jeechan' }
console.log(makeObject('firstNmae', 'kim')); // { firstNmae: 'kim' }

```



## 04-6. 클래스 메소드

### function 함수와 this 키워드

- `function`으로 만드는 함수는 `Function` 클래스의 인스턴스
- arrow function은 자신의 this를 바인딩하지 않는다.

### 클래스 메소드

```typescript
export class B {
  constructor(public value: number = 1) {}
  method(): void {
    console.log(`value: ${this.value}`);
  }
}
```

```typescript
const b = new B(5);
b.method();	// 5
```



### 정적 메소드 static method

```typescript
export class C {
  constructor(public name: string) {}
  static whoRu(): string {
    return `I'm class C`;
  }
}

const c1 = new C('jee');
const c2 = new C('yeo');

console.log(c1);
console.log(c2);
console.log(C.whoRu());

```



### 메소드 체인 method chain

- 메소드가 항상 this를 반환하게 한다.

  ```typescript
  export class Calculator {
    constructor(public value: number = 0) {}
    add(value: number) {
      this.value += value;
      return this; // method chain을 위한 자기 자신 반환
    }
    multiply(value: number) {
      this.value *= value;
      return this;	// method chain을 위한 자기 자신 반환
    }
  }
  ```

  ```typescript
  
  const cal: Calculator = new Calculator();
  console.log(cal.add(3));		// 3
  console.log(cal.multiply(2));	// 6
  console.log(cal.add(4).multiply(10)); 	// 100
  
  console.log(cal.value);	// 100
  
  ```

  
