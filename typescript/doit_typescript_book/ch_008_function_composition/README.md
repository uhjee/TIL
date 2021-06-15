ch.008 함수 조합의 원리와 응용

## 08-1. 함수형 프로그래밍이란?

- 람다 수학
- 조합 논리
- 카테고리 이론

함수형 프로그래밍은 위 세 가지 수학 이론에 기반을 두고 있다... 고 한다..

typescript에서는 함수형 언어의 주요 개념인 **패턴 매칭**과 **고차 타입**이라는 기능을 생략함으로써 함수형 구문을 쉽게 만들었다..



## 08-2 제네릭 함수

### 제네릭 타입 generic type

number[], boolean[], string[] 등 의 배열은 T[]로 표현이 가능

이처럼 타입변수(type variable) 로 T를 표현할 때, 이를 제네릭 타입 generic type이라고 한다.

- 함수, 인터페이스, 클래스, 타입 별칭 에 적용할 수 있다.

typescript의 함수는 매개변수와 반환값에 타입이 존재하므로, 함수 조합을 구현할 때는 제네릭 함수 구문을 사용해 타입을 명시해줘야 한다.

### 제네릭  타입 구문

1. 함수

    ```typescript
    // 함수 선언식
    function func1<T>(a: T): void { ... }
    function func2<T, Q>(a: T, b: Q): void { ... }
    
    // 화살표 함수
    const func3 = <T>(a: T): void => { ... }
    const func4 = <T, Q>(a: T, b: Q): void => { ... }
    ```

2. 타입 별칭 type alias

    ```typescript
    type Type1Func<T> = (T) => void
    type Type2Func<T, Q> = (T, Q) => void
    type Type3Func<T, Q, R> = (T, Q) => R
    ```

    

### 함수의 역할 

#### Map

- 하나의 값을 받아 하나의 결과값을 내보내는 관계 : 일대일 관계(one-to-one-relationship) => mapping, map

  ```type
  type MapFunc<T, R> = (T) => R
  ```

  T 타입 인자를 하나 받아서  R타입 반환값 하나를 내보내는 함수의 타입 별칭

#### identity

- Map 함수의 일종

- 입력값 x를 가공없이 그대로 반환하는 것

  ```typescript
  type MapFunc<T, R> = (T) => R // map
  type IdentityFunc<T> = MapFunc<T, T> // identity
  ```

- 다음과 같이 사용 가능

  ```typescript
  const numberIdentity: IdentityFunc<number> = (x: number): number => x
  const stringIdentity: IdentityFunc<string> = (x: string): string => x
  const objectIdentity: IdentityFunc<object> = (x: object): object => x
  const arrayIdentity: IdentityFunc<any[]> = (x: any[]): any[] => x
  ```

  

## 08-3. 고차 함수와 커리 curry

### 애리티 arity

: 함수에서 매개변수(argument)의 개수

만약 f, g, h 라는 세 함수의 애리티가 모두 1이라면, 다음처럼 연결해서 사용할 수 있다.

```typescript
y = h(g(f(x)))
```

함수형 프로그래밍에서는 compose() 또는 pipe()라는 이름의 함수를 사용해서 f, g, h 함수들을 조합해 새로운 함수를 만들 수 있다.

이는 고차함수의 개념을 알아야 가능

### 고차함수 high-order function, 커리 Curry

: 함수가 또 다른 함수를 반환할 때 그 함수를 고차 함수라 한다. (함수를 반환하는 함수)

- 1차 함수: 함수가 아닌 값을 반환하는 함수
- 2차 고차 함수: 1차 함수를 반환하는 함수
- n차 고차 함수: (n-1)차 함수를 반환하는 함수

```typescript
export type FirstOrderFunc<T, R> = (T) => R // 1차 함수
export type SecondOrderFunc<T, R> = (T) => FirstOrderFunc<T, R> // 2차 고차 함수
export type ThirdOrderFunc<T, R> = (T) => SecondOrderFunc<T, R> // 3차 고차 함수
```

구현

```typescript
import { FirstOrderFunc, SecondOrderFunc, ThirdOrderFunc } from './func-signature';

// 1차 함수
export const inc: FirstOrderFunc<number, number> = (x: number): number => x + 1;

// 2차 고차 함수
export const add: SecondOrderFunc<number, number> =
  (x: number): FirstOrderFunc<number, number> =>
  (y: number): number =>
    x + y;

// 3차 고차 함수
export const add3: ThirdOrderFunc<number, number> =
  (x: number): SecondOrderFunc<number, number> =>
  (y: number): FirstOrderFunc<number, number> =>
  (z: number): number =>
    x + y + z;
```



호출

```typescript
import { inc, add, add3 } from './high-order-func';

console.log(
  //
  inc(1), // 1차 함수의 호출이기 때문에 괄호 1번만 감싼다
);

console.log(
  //
  add(1)(2), // 2차 고차 함수의 호출, 괄호 2번 curry
);

console.log(
  //
  add3(1)(2)(3), // 3차 고차 함수의 호출
);
```



### 부분 적용 함수와 커리  partially applied function

add3(1)(2) 와 같이 자신의 차수보다 함수 호출 연산자를 덜 사용 하면 **부분적용 함수**  또는 **부분 함수**라 칭한다.

구성하는 함수들의 argument가 전부 채워지지 않은 상태



### 클로저 closure

지속되는 유효 범위를 의미

add 함수가 반환하는 함수 내부에서 외부의 변수  x를 참조하고 있다. (자신의 파라미터도 아니고, 지역변수도 아닌 변수 => **자유변수**)

```typescript
function add(x: number): (number) => number { // 바깥쪽유효범위시작  
  return function(y: number): number {			// 안쪽유효범위시작    
    return x + y 														// 클로저  
  } 																				// 안쪽유효범위끝
} 																					// 바깥쪽유효범위끝
```

add 함수가 호출되어 내부 함수가 반환될 때, 반환되는 함수에서는 외부 변수들을 캡쳐해둔다.

따라서 메모리에서 해제되지 않고, 참조할 수 있다.(따라서 메모리 관리도 잘해야 한다.)

### 해제되지 않는 클로저

- 원형 리스트 구조를 이용해 해제되지 않도록 처리

```typescript
// 2차 고차 함수 - 해제되지 않는 클로저
const makeNames = (): (() => string) => {
  const names = ['jack', 'jane', 'smith'];
  let index = 0;
  return (): string => {
    if (index === names.length) index = 0; // 원형 리스트 circular list 처럼 동작 => 클로저 해제 안됨
    return names[index++];
  };
};

export const range = (
  //
  to: number,
  from: number = 0,
): number[] => (from < to ? [from, ...range(to, from + 1)] : []);

const makeName: () => string = makeNames();

console.log(range(10).map((i) => makeName()));
console.log([1, 2, 3, 4, 5, 6].map((n) => makeName()));

```



## 08-4. 함수조합 function composition

작은 기능들을 구현한 함수를 여러번 조합해 더 의미있는 함수를 만들어 내는 프로그램 설계 기법

### compose, pipe

- 가변 인수 스타일로 함수의 배열을 입력
- 함수들을 조합해 매개변수 x를 입력받는 1차 함수를 반환



호출할 arity가 1인 1차함수들 

```typescript
type FuncString<T> = (x: T) => string;

export const f: FuncString<string> = <T>(x: T) => `f(${x})`;
export const g: FuncString<string> = <T>(x: T) => `g(${x})`;
export const h: FuncString<string> = <T>(x: T) => `h(${x})`;

```



compose 함수로 조합, 호출

```typescript
import { f, g, h } from './f-g-h';

export const compose =
  <T, R>(...functions: readonly Function[]): Function =>
  // 아래 1차 함수 리턴
  (x: T): ((y: T) => R) => {
    const deepCopiedFunctions = [...functions];
    return deepCopiedFunctions.reverse().reduce((value, func) => func(value), x);
  };

const composedFGH = compose(h, g, f);
console.log(composedFGH); 		// [Function]
console.log(composedFGH(1));	// h(g(f(1)))

```



pipe : compose 의 역순

```typescript
import { f, g, h } from './f-g-h';

export const pipe =
  <T, R>(...functions: readonly Function[]): Function =>
  (x: T): ((t: T) => R) =>
    functions.reduce((value, func) => func(value), x);

const pipedFGH = pipe(f, g, h);

console.log(pipedFGH(1)); // h(g(f(x)))
```

