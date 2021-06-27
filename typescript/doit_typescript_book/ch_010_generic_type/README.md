# 제네릭 프로그래밍

## 10-1. 제네릭 타입 이해하기

- 인터페이스, 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능

```typescript
/**
 * generic이 사용될 수 있는 곳 4가지
 */

// 1. 인터페이스
interface Ivaluable<T> {
  value: T;
}

// 2. 함수
function identity<T>(arg: T): T {
  return arg;
}

// 3. 타입 별칭
type IvaluableType<T> = {
  value: T;
};

// 4. 클래스 구문
class Valuable<T> {
  constructor(public value: T) {}
}
```



사용 예제

```typescript
import { Ivaluable } from './generic';

// 제네릭 인터페이스 구현한 클래스
export class Valuable<T> implements Ivaluable<T> {
  constructor(public value: T) {}
}

// 제네릭 인터페이스를 사용한 함수 선언
const printValue = <T>(o: Ivaluable<T>): void => console.log(o.value);

// 타입 명시
printValue(new Valuable<string>('happy')); // string
printValue(new Valuable<number>(3)); // number
printValue(new Valuable<boolean>(true)); // boolean
printValue(new Valuable<object>({ name: 'jee' })); // object
printValue(new Valuable<number[]>([1, 2, 3])); // object(array)

// 타입 추론
printValue(new Valuable('happy')); // string
printValue(new Valuable(3)); // number
printValue(new Valuable(true)); // boolean
printValue(new Valuable({ name: 'jee' })); // object
printValue(new Valuable([1, 2, 3])); // object(array)
```



## 10-2. 제네릭 타입 제약 generic type constraint

: 타입 변수에 적용할 수 있는 타입의 범위를 한정하는 기능

```typescript
<최종타입1 extend 타입1, 최종타입2 extend 타입2>(a: 최종타입1, b: 최종타입2, ...) []
```



### new 타입 제약

- **factory fucntion 팩토리 함수**

  : new 연산자를 사용해 객체를 생성하는 함수

  객체를 생성하는 방법이 지나치게 복잡할 때 이를 단순화하려는 목적으로 구현

- 타입의 타입 구현

```typescript
const create = <T extends {new(): T}>(type: T): T => new type()
```

- 중괄호 생략

```typescript
const create = <T>(type: new() =>  T): T => new type()
```

- `{new(): T}` 와 `new() => T` 는 같은 의미

- new 연산자를 type에 적용하면서, type의 생성자 쪽으로 매개변수를 전달해야할 때에는 `new(...args)` 구문 사용

  ```typescript
  export const create = <T>(type: { new (...args): T }, ...args): T => new type(...args);
  
  class Point {
    constructor(public x: number, public y: number) {}
  }
  [
    //
    create(Date), // 2021-06-27T07:44:51.530Z
    create(Point, 0, 0), // Point { x: 0, y: 0 }
  ].forEach(s => console.log(s));
  ```

  

### 인덱스 타입 제약

객체의 일정 속성만 추려서 좀 더 단순한 객체를 만들어야할 때가 있다.

- pick 함수 구현

	```typescript
  export const pick = (obj, keys) =>
    keys.map(key => ({ [key]: obj[key] })).reduce((result, value) => ({ ...result, ...value }), {});
  
  const obj = {
    name: 'Jane',
    age: 22,
    city: 'Seoul',
    country: 'Korea',
  };
  
  console.log(
    //
    pick(obj, ['name', 'age']), // { name: 'Jane', age: 22 }
    pick(obj, ['nae', 'agge']), // ! 엉뚱한 결과 반환 { name: 'Jane', agge: undefined }
  );
  
  ```

  `['nae', 'agge']` 과 같이 오타가 발생하면 undefined 를 담는다.
  
  이를 방지할 목적으로 `keyof T` 형태로 타입 제약. 이를 **인덱스 타입 제약**이라 한다.
  
  ```typescript
  <T, K extends keyof T>
  ```
  
  ```typescript
  export const pick1 = <T, K extends keyof T>(obj: T, keys: K) => // keyof 사용
    keys.map(key => ({ [key]: obj[key] })).reduce((result, value) => ({ ...result, ...value }), {});
  
  const obj1 = {
    name: 'Jane',
    age: 22,
    city: 'Seoul',
    country: 'Korea',
  };
  
  console.log(
    //
    pick1(obj1, ['name', 'age']), // { name: 'Jane', age: 22 }
    pick1(obj1, ['nae', 'agge']), // ! 엉뚱한 결과 반환 { name: 'Jane', agge: undefined  // 린트 에러 발생
  );
  ```
  
  