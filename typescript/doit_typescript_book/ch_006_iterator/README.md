# ch_006 iterator 반복자



## 06-1 반복기 이해하기

```typescript
// 반복기와 반복기 제공자
//  for...of -> iterator
const numArray: number[] = [1, 2, 3];
for (let item of numArray) {
  console.log(item);
}
```

- for... of 구문은 프로그래밍 언어에서 반복기(iterator) 라는 주제와 관련됨

### iterator 반복기 의 조건

아래 두 가지 특징을 갖는 객체

1. `next()`라는 이름의 메소드 제공
2. `next` 메소드는 `value`와 `done` 이라는 두 개의 속성을 가진 객체를 반환

### iterable 반복기 제공자

- 반복기 객체를 제공하는 함수
- iterator는 iterable에 의해서만 제공된다.

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

