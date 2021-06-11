import { range, createRangeIterable, RangeIterable } from './createRangeIterable';

import { StringIterable } from './StringIterable';

import { generator } from './generator';

console.log('start!');

// 반복기와 반복기 제공자
//  for...of -> iterator
const numArray: number[] = [1, 2, 3];
for (let item of numArray) {
  console.log(item);
}
console.clear();

// 01. 반복기 제공자 함수(iterable)를 통해 iterator 생성
const iterator = createRangeIterable(1, 3 + 1);

while (true) {
  const { value, done } = iterator.next(); // 02. 반복기 동작
  if (done) break;
  console.log(value);
}

// 일반 range
// console.log(range(1, 5 + 1));

// for..of  + range
for (let value of range(1, 5 + 1)) console.log(value + 'range'); // 1range, ... , 5range

// ! 아래 코드는 [Symbol.iterator] 클래스를 구현해야 한다는 오류 발생
// for (let value of iterator) {
// }

console.clear();

const iterator1 = new RangeIterable(1, 3 + 1);

for (let value of iterator1) {
  console.log(value);
}

// Iterable<T> 사용

for (let item of new StringIterable(['hi', 'hello', 'bye'])) {
  console.log(item);
}

console.clear();

// generator
for (let value of generator()) {
  console.log(value);
}
