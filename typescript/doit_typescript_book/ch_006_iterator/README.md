# ch_006 iterator 반복자



## 06-1 반복기 이해하기

### for ... of  구문

```typescript
// 반복기와 반복기 제공자
//  for...of -> iterator
const numArray: number[] = [1, 2, 3];
for (let item of numArray) {
  console.log(item);
}
```

- for... of 구문은 객체의 `[Symbol.iterator]` 프로퍼티를 호출
- for ... in과의 차이점
  - for...in 은 모든 객체에서 동작
  - for ...of 는  iterable이 제공하는 iterator를 호출하며 실행


### iterator 반복기 의 조건

아래 두 가지 특징을 갖는 객체

1. `next()`라는 이름의 메소드 제공
2. `next` 메소드는 `value`와 `done` 이라는 두 개의 프로퍼티를 가진 객체를 반환

### iterable 반복기 제공자

- 반복기 객체를 제공하는 역할
- iterator는 iterable에 의해서만 제공된다.

> ✔ `Symbol.iterator` 프로퍼티에 대한 구현을 갖고 있는 객체는 `Iterable`로 간주된다.

- `Array`, `Map`, `Set`, `String` 등 일부 내장 타입에는 이미 Symbol.iterator 프로퍼티가 구현되어 있다.

```typescript
// iterable: 반복기 제공자 iterator 객체를 반환하는 함수
export const createRangeIterable = (from: number, to: number) => {
  let currentValue = from;
  // iterator 객체 (반복기)
  //  - 1. next 메소드 가져야함
  //  - 2. next 메소드는 value, done 을 가진 객체를 리턴해야함
  return {
    next() {
      const value = currentValue < to ? currentValue++ : undefined;
      const done = value === undefined;
      return { value, done };
    },
  };
};
```

iterator 사용

```typescript
import { createRangeIterable } from './createRangeIterable';

// 01. 반복기 제공자 함수(iterable)를 통해 iterator 생성
const iterator = createRangeIterable(1, 3 + 1);

while (true) {
  const { value, done } = iterator.next(); // 02. 반복기 동작
  if (done) break;
  console.log(value); // 1 2 3
}
```

### 반복기 iterator 필요성

- iterator가 생성한 값을 한번에 배열에 넣지 않고, 값이 필요할 때 생성
- 따라서 메모리 효율성이 더 높다.

반복기가 아닌 경우

```typescript
// 값이 필요한 시점보다 이전에 한번에 미리 생성해둠 (메모리 효율성에서 떨어짐)
export const range = (from: number, to: number) => (from < to ? [from, ...range(from + 1, to)] : []);

console.log(range(1, 5 + 1)); // [ 1,2,3,4,5 ]
```



### [Symbol.iterator]

```typescript
const iterator = createRangeIterable(1, 3 + 1);

// ! 아래 코드는 [Symbol.iterator] 클래스를 구현해야 한다는 오류 발생
// for (let value of iterator) {
// }
```

[Symbol.iterator] 프로퍼티를 가진 iterable 구현

- 객체는 반드시 하나의 `[Symbol.iterator]`를 가질 수 있다.

```typescript
export class RangeIterable {
  constructor(public from: number, public to: number) {}

  [Symbol.iterator]() {
    const self = this;
    let currentValue = self.from;
    return {
      next() {
        const value = currentValue < self.to ? currentValue++ : undefined;
        const done = value === undefined;
        return { value, done };
      },
    };
  }
}
```

```typescript
const iterator1 = new RangeIterable(1, 3 + 1)

for (let value of iterator1) {
  console.log(value)
}
```

### Iterable<T> 와 Iterator<T> 인터페이스

#### Iterable<T>

```typescript
class 구현클래스 implements Iterable<생성할 값의 타입> {}
```

#### Iterator<T>

```typescript
[Symbol.iterator](): Iterator<생성할 값의 타입> {}
```

예제

```typescript
// Iterable<string> 구현
export class StringIterable implements Iterable<string> {
  constructor(private strings: string[] = [], private currentIndex: number = 0) {}

  // Iterator<string> 인터페이스 타입 리턴
  [Symbol.iterator](): Iterator<string> {
    const self = this
    let currentIndex = self.currentIndex,
      length = self.strings.length

    // 리턴 값(Iterator)
    const iterator: Iterator<string> = {
      next(): { value: string | undefined; done: boolean } {
        const value = currentIndex < length ? self.strings[currentIndex++] : undefined
        const done = value === undefined
        return { value, done }
      },
    }
    return iterator
  }
}

```



