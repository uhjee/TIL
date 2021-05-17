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



