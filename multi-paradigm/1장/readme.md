# 1장 멀티패러다임이 현대 언어를 확장하는 방법

- 정통적인 객체지향 디자인 패턴인 **반복자 패턴**이 함수형 패러다임의 **일급함수**와 만나 가치를 높이고 있음
- 명령형 패러다임으로 작성되는 **제네레이터**도 마찬가지

## 반복자 패턴

- 반복자 패턴은 컬렉션의 요소를 순회하는 방법을 정의하는 패턴
- 컬렉션 내부 구조를 직접 노출하는 대신 `next()`와 같은 public 메소드를 통해 내부 요소에 접근할 수 있도록 설계
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

## 이터레이션 프로토콜

ES6에 도입된 이터레이션 프로토콜은 어떤 객체가 이터러블인지 여부를 나타내는 규칙과 해당 규칙을 따르는 문법들을 제공하는 규칙

- Iterator 이터레이터

  - 값을 순차적으로 접근하는 방법 제공
  - next() 함수를 가지며, 데이터 컬렉션을 순회하기 위한 객체

- Iterable 이터러블

  - 이터러블 객체는 자신이 가진 요소들을 이터레이터를 통해 순회할 수 있도록 함 (반복 가능한 객체)
  - Iterator를 반환하는 `[Symbol.iterator]() {return {next(){...}};}` 메소드를 갖고 있는 객체
    - `[Symbol.iterator]` : 이터레이터를 반환하는 함수
  - `for...of`, `전개 연산자`, `구조분해` 등 다양한 기능 사용 가능
  - 반복자 패턴의 특징을 모두 갖고 있음
  - Array, Map, Set 등

- IterableIteraor

  - Iterator의 속성과 Iterable의 속성을 모두 갖는 객체

- Generator

  - 이터레이터를 쉽게 만들기 위한 함수

  ```ts
  /**
   * IterableIterator을 생성하는 함수
   * @param end 종료 값
   * @returns 이터레이터
   */
  function naturals2(end = Infinity): IterableIterator<number> {
    let n = 1;
    return {
      next(): IteratorResult<number> {
        return n <= end
          ? { value: n++, done: false } // IteratorYieldResult<number>
          : { value: undefined, done: true }; // IteratorReturnResult<number>
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  const iter5 = naturals2(3);
  // iter5가 이터러블이기 때문에 for of 문에 사용 가능
  for (const num of iter5) {
    console.log(num);
  }
  ```

### JS 내장 이터러블

- Array, Set, Map, Map.entries(), Map.values(), Map.keys(), String 등

- Array 객체

  ```ts
  const array3 = [1, 2, 3];
  const array3Iterator = array3[Symbol.iterator]();

  // for of 내부에서 새로운 iterator를 생성해 순회
  for (const i of array3) {
    console.log(i);
  }
  ```

- Set 객체

  ```ts
  const set = new Set(['a', 'b', 'c']);
  const setIterator = set[Symbol.iterator]();

  for (const i of set) {
    console.log(i);
  }
  ```

- Map 객체

  ```ts
  const map1 = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]);

  const map1Iterator = map1[Symbol.iterator]();

  for (const [key, value] of map1) {
    console.log(key, value);
  }
  ```

- Map.entries(), Map.values()

  ```ts
  // Map.entreis()
  const map1Entries = map1.entries();

  console.log(map1Entries.next()); // { value: ['a', 1], done: false }
  console.log(map1Entries.next()); // { value: ['b', 2], done: false }
  console.log(map1Entries.next()); // { value: ['c', 3], done: false }
  console.log(map1Entries.next()); // { value: undefined, done: true }
  for (const [key, value] of map1Entries) {
    console.log(key, value);
  }

  // Map.keys()
  const map1Keys = map1.keys();

  console.log(map1Keys.next()); // { value: 'a', done: false }
  console.log(map1Keys.next()); // { value: 'b', done: false }
  console.log(map1Keys.next()); // { value: 'c', done: false }

  // Map.values()
  const map1Values = map1.values();

  console.log(map1Values.next()); // { value: 1, done: false }
  console.log(map1Values.next()); // { value: 2, done: false }
  console.log(map1Values.next()); // { value: 3, done: false }
  console.log(map1Values.next()); // { value: undefined, done: true }
  ```

- String

  ```ts
  const string = 'abc';
  const stringIterator = string[Symbol.iterator]();

  console.log(stringIterator.next()); // { value: 'a', done: false }
  console.log(stringIterator.next()); // { value: 'b', done: false }
  console.log(stringIterator.next()); // { value: 'c', done: false }
  ```

## 이터러블 활용

### 전개연산자

- array 병합, Set 객체를 Array 객체로 변환, 가변 인자 함수 구현 등

- 가변 인자 함수

  ```ts
  // 가변 인자 함수
  const numbers = [1, 2, 3, 4, 5];
  function sum(...nums: number[]): number {
    return nums.reduce((acc, cur) => acc + cur, 0);
  }

  console.log(sum(1, 2, 3, 4, 5)); // 15
  console.log(sum(...numbers)); // 15
  ```

### 구조분해 할당

```ts
// 구조분해 할당
const [head, ...rest] = numbers;

console.log(head); // 1
console.log(rest); // [2, 3, 4, 5]
```

### 제네레이터로 만든 map 함수

```ts
function* map2<A, B>(
  f: (value: A) => B,
  iterable: Iterable<A>,
): IterableIterator<B> {
  for (const value of iterable) {
    yield f(value); // 지연평가
  }
}

const mapped: IterableIterator<number> = map2<number, number>(
  (x) => x * x,
  [1, 2, 3, 4, 5],
);
const map2Iterator = mapped[Symbol.iterator](); // Iterable의 특징 - [Symbol.iterator] 를 프로퍼티로 갖는다.

console.log(mapped.next()); // { value: 1, done: false }
console.log(map2Iterator.next()); // { value: 4, done: false }
console.log([...map2Iterator]); // [9, 16, 25]

let acc = 0;
for (const n of map2((x) => x * x, [1, 2, 3, 4, 5])) {
  acc += n;
}

console.log(acc); // 55
```

---

## 이터러블을 다루는 함수형 프로그래밍

### forEach 함수

함수와 이터러블을 순회하면서 각 요소에 인자로 받은 함수를 적용하는 고차함수

1. for...of문을 활용해 순회

   ```ts
   function forEach<A>(f: (item: A) => void, iterable: Iterable<A>) {
     for (const value of iterable) {
       // for...of 를 활용해 이터러블 순회
       f(value);
     }
   }

   const array4 = [1, 2, 3];
   forEach((x) => console.log(x), array4);
   ```

2. 이터레이터 직접 조작

   ```ts
   // while문 활용
   function forEach2<A>(f: (item: A) => void, iterable: Iterable<A>) {
     const iterator = iterable[Symbol.iterator](); // 이터레이터 생성
     let result = iterator.next(); // 첫 번째 요소 추출
     while (!result.done) {
       // 모든 요소를 순회할 때까지
       f(result.value); // 요소에 함수 적용
       result = iterator.next(); // 다음 요소 추출
     }
   }

   const set1 = new Set([1, 2, 3]);
   forEach2((x) => console.log(x), set1);
   ```

### map 함수

1. for...of문 활용

   ```ts
   function* map3<A, B>(f: (item: A) => B, iterable: Iterable<A>) {
     for (const value of iterable) {
       yield f(value);
     }
   }

   // 이터레이터 반환
   const mapped2: IterableIterator<number> = map3<number, number>(
     (x) => x * x,
     [1, 2, 3, 4, 5],
   );

   // 이터레이터를 배열로 변환 - 전개연산자는 이터러블을 소비
   console.log([...mapped2]);

   const mapped3 = map3((x) => x * 3, naturals2(3));
   forEach(console.log, mapped3);
   ```

2. while문 활용

   ```ts
   // while문 활용
   function* map4<A, B>(f: (item: A) => B, iterable: Iterable<A>) {
     const iterator = iterable[Symbol.iterator](); // 이터레이터 생성
     while (true) {
       const { done, value } = iterator.next();
       if (done) break;
       yield f(value); // 요소에 함수 적용
     }
   }

   const mapped4 = map4(
     ([k, v]) => `${k}: ${v}`,
     new Map([
       ['a', 1],
       ['b', 2],
     ]),
   );
   forEach(console.log, mapped4);
   ```

3. IterableIterator를 직접 만들어 반환

   ```ts
   // 이터레이터 반환
   function map5<A, B>(f: (item: A) => B, iterable: Iterable<A>) {
     const iterator = iterable[Symbol.iterator]();
     return {
       // next() 메소드 직접 구현
       next(): IteratorResult<B> {
         const { done, value } = iterator.next();
         return { value: done ? value : f(value), done };
       },
       [Symbol.iterator]() {
         return this;
       },
     };
   }

   const iterator5 = (function* () {
     yield 1;
     yield 2;
     yield 3;
   })();

   const mapped5 = map5((x: number) => x * 10, iterator5);
   console.log([...mapped5]);
   ```

### filter 함수

1. for...of 활용

   ```ts
   function* filter<A>(f: (item: A) => boolean, iterable: Iterable<A>) {
     for (const value of iterable) {
       if (f(value)) {
         yield value; // 필요한 요소만 yield를 통해 반환
       }
     }
   }

   const filtered = filter((x) => x % 2 === 0, [1, 2, 3, 4, 5]);
   console.log([...filtered]);
   ```

2. while문 활용

   ```ts
   function* filter2<A>(f: (item: A) => boolean, iterable: Iterable<A>) {
     const iterator = iterable[Symbol.iterator]();
     while (true) {
       const { done, value } = iterator.next();
       if (done) break;
       if (f(value)) yield value;
     }
   }

   const array5 = [1, 2, 3, 4, 5];
   const filtered2 = filter2((x) => x % 2 === 0, array5);
   console.log([...filtered2]);
   ```

3. 이터레이터 반환

   ```ts
   // 이터레이터 반환
   function filter3<A>(f: (item: A) => boolean, iterable: Iterable<A>) {
     const iterator = iterable[Symbol.iterator]();
     return {
       next(): IteratorResult<A> {
         const { done, value } = iterator.next();
         if (done) return { done, value };
         if (f(value)) return { done, value };
         return this.next(); // 필요한 요소가 아니면 재귀호출 (꼬리 호출 최적화)
       },
       [Symbol.iterator]() {
         return this;
       },
     };
   }

   console.log([...filter3((x) => x % 2 === 1, [1, 2, 3, 4, 5])]);
   ```

- 재귀호출로 순회 구현하여 매우 간결
- 꼬리 호출 최적화(Tail Call Optimization) 가능
  - 꼬리 호출 최적화(Tail Call Optimization): 함수형 프로그래밍에서 재귀함수를 효율적으로 실행할 수 있는 최적화 기법
  - 호출 스택에 새로운 스택 프레임을 추가하지 않고 기존스택 프레임을 재사용하는 최적화 기법
  - 꼬리 호출 최적화 적용 조건: 함수가 반환될 때, 마지막으로 호출되는 함수가 재귀 호출이어야 함