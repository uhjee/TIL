# 1장 멀티패러다임이 현대 언어를 확장하는 방법

- 정통적인 객체지향 디자인 패턴인 **반복자 패턴**이 함수형 패러다임의 **일급함수**와 만나 가치를 높이고 있음
- 명령형 패러다임으로 작성되는 **제네레이터**도 마찬가지

## 반복자 패턴

- 반복자 패턴은 컬렉션의 요소를 순회하는 방법을 정의하는 패턴
- 이 패턴은 컬렉션의 내부 구조를 노출하지 않고, 컬렉션의 요소를 안전하게 순회할 수 있도록 해줌
- 반복자 패턴의 지연성은 지연 평가가 가능한 객체를 생성할 수 있게 해주고, 일급 함수는 고차 함수를 정의할 수 있게 해줌

### 축약된 형태로 표현한 Iterator

```ts
interface IteratorYieldResult<T> {
  done?: false;
  value: T;
}

interface IteratorReturnResult {
  done: true;
  value: undefined;
}

interface Iterator<T> {
  next(): IteratorYieldResult<T> | IteratorReturnResult;
}
```

## 이터레이터의 지연성을 이용한 reverse 함수 만들기

- 이터레이터를 활용하면 배열을 실제로 뒤집지 않고 역순으로 순회가능
- 이터레이터는 필요할 때마다 하나씩 꺼내는 **지연평가** 지원
- 불필요한 연산 및 메모리 사용량을 줄일 수 있음
- 원본 배열을 변형하지 않고 활용

```ts
/**
 * 유사배열을 반복자로 변환
 * @param arrayLike 유사배열
 * @returns 반복자
 */
function reverse<T>(arrayLike: ArrayLike<T>): Iterator<T> {
  let idx = arrayLike.length;
  return {
    next: () => {
      if (idx === 0) {
        return { done: true, value: undefined };
      }
      return {
        done: false,
        value: arrayLike[--idx],
      };
    },
  };
}

const array = ['a', 'b', 'c'];
const reverseArray = reverse(array);

console.log(reverseArray.next()); // { done: false, value: 'c' }
console.log(reverseArray.next()); // { done: false, value: 'b' }
console.log(reverseArray.next()); // { done: false, value: 'a' }
console.log(reverseArray.next()); // { done: true, value: undefined }
```

## 지연평가되는 map 함수

- 일급 함수
  - 함수를 값처럼 다루어 변수에 담거나 다른 함수의 인자로 전달하거나 함수의 반환값으로 사용할 수 있는 함수
  - 일급 함수를 활용해 고차 함수 구현 가능
- 고차 함수
  - 하나 이상의 함수를 인자로 받거나 반환하는 함수
- map, filter, take, reduce 등의 지연평가를 활용하거나, 지연 평가된 리스트를 다루는 고도화된 리스트 프로세싱 함수 구현 가능

```ts
/**
 * 반복자를 수정하여 값을 변환
 * @param transform 변환 함수
 * @param iterator 반복자
 * @returns 변환된 반복자
 */
function map<A, B>(
  transform: (value: A) => B,
  iterator: Iterator<A>,
): Iterator<B> {
  return {
    next: (): IteratorResult<B> => {
      const { done, value } = iterator.next();
      return done ? { value, done } : { value: transform(value), done };
    },
  };
}

const array2 = ['a', 'b', 'c', 'd', 'e'];

// 지연 평가를 통해 필요할 때, 특정 요소에 대해 1. 순서 변경/ 2. 값 변환 가능
const mapIterator = map((x) => x + x.toUpperCase(), reverse(array2));

console.log(mapIterator.next()); // { done: false, value: 'eE' }
console.log(mapIterator.next()); // { done: false, value: 'dD' }
console.log(mapIterator.next()); // { done: false, value: 'cC' }
console.log(mapIterator.next()); // { done: false, value: 'bB' }
console.log(mapIterator.next()); // { done: false, value: 'aA' }
console.log(mapIterator.next()); // { done: true, value: undefined }
```

## 제네레이터

- 명령형 스타일로 이터레이터를 작성할 수 있게 해주는 문법
- `function*` 키워드로 정의되며, 호출 시 곧바로 실행되지 않고, 이터레이터 객체를 반환
- 이 객체를 통해 함수의 실행 흐름을 외부에서 제어할 수 있음

```ts
/**
 * 제네레이터
 * @returns 이터레이터
 */
function* generator() {
  yield 'a';
  console.log('before b');
  yield 'b';
  yield 'c';
}

const iter = generator();

console.log(iter.next()); // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
console.log(iter.next()); // { value: 'c', done: false }
console.log(iter.next()); // { value: undefined, done: true }
```

### yeild\* 키워드

- `yield*` 키워드는 제네레이터 함수 안에서 이터러블을 순회하며 해당 이터러블이 제공하는 요소들을 순차적으로 반환하도록 함
- `Iterable`: 반복을 지원하는 객체
  - javascript에서 배열은 `Iterable로` 간주되기 때문에 `for...of` , 전개 연산자, `yield*`를 통해 순회가능

```ts
/**
 * yield* 키워드를 사용하여 내부 이터러블을 순회하며 반환
 * @returns 이터레이터
 */
function* generator2() {
  yield 'a';
  yield* [2, 3];
  yield 'b';
}

const iter3 = generator2();

console.log(iter3.next()); // { value: 'a', done: false }
console.log(iter3.next()); // { value: 2, done: false }
console.log(iter3.next()); // { value: 3, done: false }
console.log(iter3.next()); // { value: 'b', done: false }
console.log(iter3.next()); // { value: undefined, done: true }
```

### 제네레이터를 활용한 reverse 함수

아래 두 경우는 구현은 다르지만 동작은 동일함

1. 제네레이터 활용

```ts
/**
 * 배열 역순 이터레이터 생성
 * @param arrayLike 배열 또는 유사배열
 * @returns 역순 이터레이터
 */
function* reverse2<T>(arrayLike: ArrayLike<T>): IterableIterator<T> {
  let idx = arrayLike.length;
  while (idx > 0) {
    yield arrayLike[--idx];
  }
}

const reversedIterator = reverse2([1, 2, 3, 4, 5]);

console.log(reversedIterator.next()); // { value: 5, done: false }
console.log(reversedIterator.next()); // { value: 4, done: false }
console.log(reversedIterator.next()); // { value: 3, done: false }
console.log(reversedIterator.next()); // { value: 2, done: false }
console.log(reversedIterator.next()); // { value: 1, done: false }
```

2. 제네레이터 사용하지 않은 경우

```ts
/**
 * 유사배열을 반복자로 변환
 * @param arrayLike 유사배열
 * @returns 반복자
 */
function reverse<T>(arrayLike: ArrayLike<T>): Iterator<T> {
  let idx = arrayLike.length;
  return {
    next: () => {
      if (idx === 0) {
        return { done: true, value: undefined };
      }
      return {
        done: false,
        value: arrayLike[--idx],
      };
    },
  };
}
```
