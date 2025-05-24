# 2장 함수형 프로그래밍과 타입 시스템 그리고 LISP

## 타입스크립트의 타입 추론과 함수 타입

- 타입스크립트는 타입추론 기능으로 명시적인 타입 선언 없이도 안전한 코드 작성 가능
- itentity 함수: 제네릭 타입 T를 받아서 그대로 반환하는 항등 함수

  ```ts
  /**
   * 제네릭 타입 T를 받아서 그대로 반환하는 항등 함수
   * @param arg 입력받은 제네릭 타입 T의 값
   * @returns 입력받은 arg와 동일한 값을 반환한다
   */
  function identity<T>(arg: T): T {
    return arg;
  }

  console.log(identity(1)); // 1
  console.log(identity('a')); // a
  ```

- constant 함수: 제네릭 타입 T를 받아서 항등 함수를 반환하는 함수

  ```ts
  /**
   * 제네릭 타입 T를 받아서 항등 함수를 반환하는 함수
   * @param arg 입력받은 제네릭 타입 T의 값
   * @returns 항등 함수를 반환한다
   */
  function constant<T>(arg: T): () => T {
    return () => arg;
  }

  const f = constant(1);
  console.log(f()); // 1
  const getHello = constant('hello');
  console.log(getHello() + getHello()); // hellohello
  ```

## 변수와 상수의 타입 추론

- 변수와 상수를 초기화할 때 타입스크립트는 해당 **값**으로부터 타입을 추론

  ```ts
  // type을 true라는 리터럴 타입으로 추론(재할당 불가하기 때문)
  const selected = true;

  // type을 boolean 타입으로 추론
  let checked = true;
  ```

## 멀티파러다임 언어에서의 함수형 타입 시스템

### forEach

```ts
/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 */
function forEach<T>(f: (a: T) => void, iterable: Iterable<T>): void {
  for (const a of iterable) {
    f(a);
  }
}
```

### map

- 제네레이터 사용: 새로운 이터러블이터레이터를 생성해 반환

```ts
/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 */
function* map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}
```

### filter

- 제네레이터 사용: 새로운 이터러블이터레이터를 생성해 반환

```ts
/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 */
function* filter<T>(
  f: (a: T) => boolean,
  iterable: Iterable<T>,
): IterableIterator<T> {
  for (const a of iterable) {
    if (f(a)) {
      yield a;
    }
  }
}
```

### reduce - function overload

함수 오버로드

- 초기값이 있을 경우, 세 개의 인자
- 초기값을 생략하고자 하는경우, f, iterable만을 인자로 받음 (iterable 첫 번째 요소가 초기값으로 세팅)
- 초기값을 생략하고, 빈 배열일 전달될 경우, 누적할 수 없기에 타입 에러 발생

```ts
/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param acc 초기값
 * @param iterator 반복 가능한 객체의 요소를 반환하는 이터레이터
 * @returns 초기값 또는 반복 가능한 객체의 각 요소에 대해 함수를 실행한 결과
 */
function baseReduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterator: Iterator<A>,
): Acc {
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    acc = f(acc, value);
  }
  return acc;
}

// reduce 함수 오버로드
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>,
): Acc;
function reduce<A, Acc>(f: (a: A, b: A) => Acc, iterable: Iterable<A>): Acc;
/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param accOrIterable 초기값 또는 반복 가능한 객체
 * @param iterable 반복 가능한 객체
 * @returns 초기값 또는 반복 가능한 객체의 각 요소에 대해 함수를 실행한 결과
 */
function reduce<A, Acc>(
  f: (a: Acc | A, b: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>,
): Acc {
  if (iterable === undefined) {
    const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
    const { done, value: acc } = iterator.next();
    if (done)
      throw new TypeError('Reduce of empty array with no initial value');
    return baseReduce(f, acc, iterator) as Acc;
  } else {
    return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
  }
}
```

## 클래스, 고차함수, 반복자, 타입시스템 조합

### 제네릭 클래스로 Iterable 확장

- FxIterable 클래스를 통해 클래스, 고차함수, 이터러블을 결합해 높은 표현력을 가진 추상화 구현

```ts
/**
 * 이터레이터 프록시
 * 제네릭 클래스로 Iterable 확장
 */
class FxIterable<A> {
  constructor(private iterable: Iterable<A>) {}

  [Symbol.iterator](): Iterator<A> {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(f: (a: A) => B): FxIterable<B> {
    return fx(map(f, this));
  }

  filter(f: (a: A) => boolean): FxIterable<A> {
    return fx(filter(f, this));
  }

  reject(f: (a: A) => boolean): FxIterable<A> {
    return this.filter((a) => !f(a));
  }

  forEach(f: (a: A) => void): void {
    return forEach(f, this);
  }

  reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc; // 초깃값 있는 경우
  reduce<Acc>(f: (a: A, b: A) => Acc): Acc; // 초깃값 없는 경우
  reduce<Acc>(f: (a: Acc | A, b: A) => Acc, acc?: Acc) {
    return acc === undefined ? reduce(f, this) : reduce(f, acc, this);
  }

  toArray(): A[] {
    return [...this];
  }

  to<R>(converter: (iterable: this) => R): R {
    return converter(this);
  }

  /**
   * 이터레이터 프록시를 이터러블로 변환하는 함수를 인자로받아 이터레이터 프록시로 변환해 반환
   * @param f 이터레이터 프록시를 이터러블로 변환하는 함수
   * @returns 이터레이터 프록시
   */
  chain<B>(f: (iterable: this) => Iterable<B>): FxIterable<B> {
    return fx(f(this));
  }
}
```

### 이터러블 헬퍼 함수

- 이터러블을 중심으로 고차함수를 구성

```ts
/**
 * 이터레이터 프록시 팩토리 (헬퍼 함수)
 * @param iterable 이터레이터
 * @returns 이터레이터 프록시
 */
function fx<A>(iterable: Iterable<A>): FxIterable<A> {
  return new FxIterable(iterable);
}
```
