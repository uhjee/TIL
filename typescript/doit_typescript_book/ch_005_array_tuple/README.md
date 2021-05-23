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

