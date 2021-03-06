# <a id="ch_004">ch_005 배열_튜플</a>



## 05-1. 배열 이해하기

- javasciprt 에서 배열은 Array 클래스의 인스턴스
- 배열에 각각 담긴 값을 item 또는 element라고 한다.



### js 배열은 **객체**이다

- javascript에서 Array의 `typeof` 연산자 결과는 `object`이다.

  - 따라서 Array의 Static method `isArray()` 를 사용해 전달받은 심벌이 배열인지 판단

    ```typescript
    const arr1 = [1, 2, 3];
    console.log(typeof arr1); 				//object
    console.log(Array.isArray(arr1)); //true
    ```

    

### 배열의 타입

```typescript
배열_변수명: 아이템_타입[] = [아이템1, 아이템2, ...]
```

예제

```typescript
let numArr: number[] = [1, 2, 3, 4]
let strArr: string[] = ['hello', 'hi']

type IPerson = { name: string, age?: number }
let personArr: IPerson[] = [{name: 'jee'}, {name: 'jack', age: 20}]
```



### 제네릭 방식 타입 Generics

- `T[]` 형태로 다양한 배열의 아이템 타입을 한꺼번에 다룰 수 있도록 표현하는 것이 편리
- 즉, 단일 타입이 아닌 다양한 타입에서 동작하는 컴포넌트를 작성할 수 있다.
- 타입을 **T**와 같이 일종의 변수(타입변수)로 취급하는 것을 **제네릭 타입**이라 칭함

#### 타입변수(type variable)

- 인수의 타입을 캡쳐해두는 변수

```typescript
const identity = <T>(arg: T): T => arg
```

- T라는 타입변수 추가
- T는 유저가 준 인수의 타입을 캡쳐하고, 이 정보를 추후 사용할 수 있도록 한다.(위 코드에서는 함수의 반환값으로 T 사용)
- 위 함수는 타입을 불문하고 동작하므로 Generic이라 할 수 있다.



#### any 타입과의 차이점

- any를 사용할 경우, 실제 함수가 반환하는 값의 타입을 알 수 없다.(반환값 또한 any)

  ```typescript
  function identity(arg: any): any {
      return arg;
  }
  ```

예제

```typescript
let numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
let strArr: string[] = ['hello', 'hi'];

// T가 type variable이란 걸 알려줘야 한다. 파라미터 앞에 <T> 붙여야 함
export const arrLength = <T>(arr: T[]): number => arr.length;
export const isEmpty = <T>(arr: T[]): boolean => arrLength<T>(arr) == 0;

console.log(arrLength(numArr));	// 8
console.log(arrLength(strArr));	// 2

console.log(isEmpty(numArr));	// false
console.log(isEmpty(strArr));	//false
console.log(isEmpty([]));			// true
```



```typescript
// 제네릭 함수
const identity = <T>(n: T): T => n;
console.log(
  identity<boolean>(true), //함수명<타입변수>(매개변수)
  identity(true)					// 타입추론을 통한 <타입변수> 생략
);
```

#### 타입 추론

- 제네릭 형태로 구현된 함수는 호출 시, 원칙적으로 다음과 같은 형태로 명시해야 한다.

  ```typescript
  함수_이름<타입_변수>(매개변수)
  ```

- typescript의 **타입 추론**을 통해 생략
  - 가장 일반적인 방법
  - 컴파일러가 인수로 해당 타입을 판단한다.
  
  

---

## 05-2. 선언형 프로그래밍과 배열

### 선언형 프로그래밍 declarative programming

- 명령형 프로그래밍 (imperative programming) 과 비교되지만, 동등하게 비교할 대상이 아님

### 1 ~ 100 합 구하기

#### 명령형 프로그래밍

- 시스템 자원의 효율 최우선

```typescript
// 명령형
let sum = 0;
for (let i = 0; i < 100; i++) {
  sum += i + 1;
}
console.log(sum);	// 5050

```



#### 선언형 프로그래밍

- **범용적**으로 구현된 함수의 **재사용**
- `데이터 생성` 과 `데이터 가공`을 분리

### range 함수

```typescript
// ? range 함수 구현
export const range = (from: number, to: number): number[] => (from < to ? [from, ...range(from + 1, to)] : []);
```



### fold 함수

```typescript
// ? fold: 접기
//    - T[] 배열 데이터를 가공해 하나의 T 타입 값으로 생성  cf. reduce..??
export const fold = <T>(array: T[], callback: (result: T, val: T) => T, initValue: T) => {
  let result: T = initValue;

  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    result = callback(result, value);
  }
  return result;
};
```



### filter 함수

```typescript
// ? filter
export const filter = <T>(array: T[], callback: (value: T, index?: number) => boolean): T[] => {
  let result: T[] = [];
  for (let index: number = 0; index < array.length; ++index) {
    const value = array[index];
    if (callback(value, index)) result = [...result, value];
  }
  return result;
};
```



### map 함수

- map 의 callback  함수는 입력받은 타입 `T` 와 리턴하는 타입 `Q` 가 서로 다를 수도 있다는 것을 고려해야 함

```typescript
// ? map
export const map = <T, Q>(array: T[], callback: (value: T, index?: number) => Q): Q[] => {
  let result: Q[] = [];
  for (let index = 0; index < array.length; ++index) {
    const value = array[index];
    result = [...result, callback(value, index)];
  }
  return result;
};
```



1 ~ 100 더하기

```typescript

// 1 ~ 100 더하기
// 입력 데이터 생성
let numbers: number[] = range(1, 100 + 1);

// 입력 데이터 가공
let result = fold(numbers, (result, val) => result + val, 0);
console.log(result);	// 5050
```



1 ~ 100 홀수만 더하기

``` typescript
// 입력 데이터 생성
let numbers1: number[] = range(1, 100 + 1);

// filter 함수의 콜백으로 predicate helper function 으로 사용되는 함수
const isOdd = (n: number): boolean => n % 2 != 0;

// 입력 데이터 가공
let result1 = fold(filter(numbers1, isOdd), (result, val) => result + val, 0);
console.log(result1); // 2500
```



1^2 + ... + 100^2 더하기

```typescript
// 1^2 + ... 100^2 더한 값 구하기
let numbers2 = range(1, 100 + 1);

let squaredResult = fold(
  map(numbers2, (val) => val * val),
  (result, val) => result + val,
  0,
);
console.log(squaredResult); // 338350
```



## 05-3. 배열의 map, reduce, filter

유인동 선생님의 함수형 프로그래밍을 다시 보자

그리고 typescript를 알게되니, 함수 시그니처를 읽을 수 있게 되어서 편한 것 같다.

filter

```typescript
filter(callback: (value: T, index?: number): boolean): T[]
```

map

```typescript
map(callback: (value: T, index?: number): Q) Q[]
```

reduce

```typescript
reduce(callback: (result: T, value: T), initialValue: T): T
```



## 05-4 순수함수와 배열

계속해 조금 뜬금없이 함수형 프로그래밍과 순수함수 이야기가 나오지만, 타입스크립트에서 재미나게 쓰이고 있는 모양이니 따라가보자!

### 순수함수?

> 부수효과, side-effect가 없는 함수

순수함수의 조건

- 함수 구현부에 입출력에 대한 코드가 없어야 한다.
- 함수는 매개변수값을 변경시키지 않는다.(const 와 readonly로만 동작한다.)
- 함수 구현부에서 전역변수나 static 변수를 사용하지 않는다.
- 함수는 파라미터와 반환값으로만 동작한다.
- 함수는 예외를 발생시키지 않는다.
- 함수가 콜백함수로 구현되었구나, 함수 몸통에 콜백함수를 사용하는 코드가 없어야 한다.
- 구현부에 Promise와 같은 비동기 방식으로 동작하는 코드가 없어야 한다. 



### readonly

 매개변수 앞에 readonly 키워드 사용 가능

초기에만 값을 할당하고, 이후 불변값

> cosnt 와의 차이점?
>
> - **변수**에 사용된다면 const
> -  **property**나 **매개변수**에 사용한다면 readonly

### 얉은 복사

- 원본의 주소값(참조)만 복사

### 깊은 복사

- 원본이 갖는 주소값의 데이터 참조값을 복사

- spread syntax를 활용한 깊은 복사

  ```typescript
  const arr1 = [ 1,2,3,4,5 ]
  const arr2 = [ ...arr1 ]
  ```

  

### 배열의 sort 메소드를 순수함수로 구현

```typescript
// sort 함수 - 순수함수로 구현
// - 원본 데이터에 대한 변형 X
export const pureSort = <T>(arr: readonly T[]): T[] => {
  let deepCopied = [...arr]; // spread syntax를 통한 깊은 복사
  return deepCopied.sort();
};
```



### 가변 인수 함수와 순수 함수 

- **가변 인수(variadic arguments)**

  - 호출할 때, 전달하는 인수의 개수를 제한하지 않는 것

- parameter 나머지 연산자를 통해 가능

  



## 05-5 튜플 이해하기 tuple

any[]으로 튜플처럼 사용할 수 있으나, typescript 기본의 타입 시스템을 무시는 것이므로, tuple 사용

```typescript
let tuple: any[] = [true, 'string', 4];   // x

let realTuple: [boolean, string, number] = [true, 'string', 4]; // o
```



### 별칭 사용 alias

-  try/catch/finnaly의 예외 처리 구문에서 사용하고자..

- 또 아래와 같은 예외처리는 불순 함수를 순수함수로 바꿔주는 전형적인 코드 설계 방식이라고 한다...

```typescript
export type ResultType = [boolean, string];
```

```typescript
import { ResultType } from './';

export const doSomething = (): ResultType => {
  try {
    throw new Error('some error occurs...');
  } catch (e) {
    return [false, e.message];
  }
};
```

- tuple도 물리적으로는 배열이기 때문에, 배열의 인덱스 연산자, 또는 비구조화 할당문을 사용할 수 있다.

```typescript
const [result, errorMessage] = doSomething();
```

