/**
 * 유사배열을 반복자로 변환
 */
class ArrayLikeIterator<T> implements Iterator<T> {
  private index = 0;
  constructor(private arrayLike: ArrayLike<T>) {}

  next(): IteratorResult<T> {
    return {
      done: this.index >= this.arrayLike.length,
      value: this.arrayLike[this.index++],
    };
  }
}

const arrayLike = {
  0: 'a',
  1: 'b',
  length: 2,
};

const iterator = new ArrayLikeIterator(arrayLike);

console.log(iterator.next()); // { done: false, value: 'a' }
console.log(iterator.next()); // { done: false, value: 'b' }
console.log(iterator.next()); // { done: true, value: undefined }

console.log('--------------------------------');
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

console.log('--------------------------------');

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

console.log('--------------------------------');

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

console.log('--------------------------------');

/**
 * 조건부 제네레이터
 * @param condition 조건
 * @returns 이터레이터
 */
function* conditionalGenerator(condition: boolean) {
  let count = 0;
  count++;
  yield 'a' + count;
  count++;
  if (condition) {
    yield 'b' + count;
  }
  count++;
  yield 'c' + count;
}

const iter2 = conditionalGenerator(false);

console.log(iter2.next()); // { value: 'a', done: false }
console.log(iter2.next()); // { value: 'c', done: false }
console.log(iter2.next()); // { value: undefined, done: true }

console.log('--------------------------------');

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

console.log('--------------------------------');

/**
 * 자연수 생성기
 * 지연평가로 인해 원할 때 무한히 값을 생성할 수 있음
 * @returns 이터레이터
 */
function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

const iter4 = naturals();

console.log(iter4.next()); // { value: 1, done: false }
console.log(iter4.next()); // { value: 2, done: false }
console.log(iter4.next()); // { value: 3, done: false }
console.log(iter4.next()); // { value: 4, done: false }

console.log('--------------------------------');

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

console.log('------------이터레이션 프로토콜--------------------');

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

console.log('----------JS 내장 이터러블------------');

const array3 = [1, 2, 3];
const array3Iterator = array3[Symbol.iterator]();

console.log(array3Iterator.next()); // { value: 1, done: false }
console.log(array3Iterator.next()); // { value: 2, done: false }
console.log(array3Iterator.next()); // { value: 3, done: false }
console.log(array3Iterator.next()); // { value: undefined, done: true }

// for of 내부에서 새로운 iterator를 생성해 순회
for (const i of array3) {
  console.log(i);
}

console.log('--------------------------------');

const set = new Set(['a', 'b', 'c']);
const setIterator = set[Symbol.iterator]();

console.log(setIterator.next()); // { value: 'a', done: false }
console.log(setIterator.next()); // { value: 'b', done: false }
console.log(setIterator.next()); // { value: 'c', done: false }
console.log(setIterator.next()); // { value: undefined, done: true }

for (const i of set) {
  console.log(i);
}

console.log('--------------------------------');

const map1 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const map1Iterator = map1[Symbol.iterator]();

console.log(map1Iterator.next()); // { value: ['a', 1], done: false }
console.log(map1Iterator.next()); // { value: ['b', 2], done: false }
console.log(map1Iterator.next()); // { value: ['c', 3], done: false }
console.log(map1Iterator.next()); // { value: undefined, done: true }

for (const [key, value] of map1) {
  console.log(key, value);
}

console.log('--------------------------------');

const map1Entries = map1.entries();

console.log(map1Entries.next()); // { value: ['a', 1], done: false }
console.log(map1Entries.next()); // { value: ['b', 2], done: false }
console.log(map1Entries.next()); // { value: ['c', 3], done: false }
console.log(map1Entries.next()); // { value: undefined, done: true }
for (const [key, value] of map1Entries) {
  console.log(key, value);
}

const map1Values = map1.values();

console.log(map1Values.next()); // { value: 1, done: false }
console.log(map1Values.next()); // { value: 2, done: false }
console.log(map1Values.next()); // { value: 3, done: false }
console.log(map1Values.next()); // { value: undefined, done: true }

const map1Keys = map1.keys();

console.log(map1Keys.next()); // { value: 'a', done: false }
console.log(map1Keys.next()); // { value: 'b', done: false }
console.log(map1Keys.next()); // { value: 'c', done: false }

console.log('--------------------------------');

const string = 'abc';
const stringIterator = string[Symbol.iterator]();

console.log(stringIterator.next()); // { value: 'a', done: false }
console.log(stringIterator.next()); // { value: 'b', done: false }
console.log(stringIterator.next()); // { value: 'c', done: false }

console.log('--------------------------------');

// 가변 인자 함수
const numbers = [1, 2, 3, 4, 5];
function sum(...nums: number[]): number {
  return nums.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(...numbers)); // 15

console.log('--------------------------------');

// 구조분해 할당
const [head, ...rest] = numbers;

console.log(head); // 1
console.log(rest); // [2, 3, 4, 5]

console.log('--------------------------------');

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
const map2Iterator = mapped[Symbol.iterator]();

console.log(mapped.next()); // { value: 1, done: false }
console.log(map2Iterator.next()); // { value: 4, done: false }
console.log([...map2Iterator]); // [9, 16, 25]

let acc = 0;
for (const n of map2((x) => x * x, [1, 2, 3, 4, 5])) {
  acc += n;
}

console.log(acc); // 55

console.log('--------------------------------');
