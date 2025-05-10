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
const arr = [1, 2, 3, 4];
// forEach((a) => console.log(a), arr);

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

// forEach(
//   console.log,
//   map((a) => a * 2, arr),
// );

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

// forEach(
//   console.log,
//   filter((a) => a % 2 === 0, arr),
// );

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
// 초기값이 있는 경우
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>,
): Acc;
// 초기값이 없는 경우
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

// const totalSum = reduce((acc, a) => acc + a, 0, arr);
// console.log(totalSum);

// const abc = reduce((acc, a) => `${acc}${a}`, []);
// console.log(abc);

function* naturals(end = Infinity): IterableIterator<number> {
  let num = 1;
  while (true) {
    if (num > end) return;
    yield num++;
  }
}

const naturalsIterable = naturals(10);

console.log(
  reduce(
    (acc, a) => (acc += a),
    map(
      (a) => a * a,
      filter((a) => a % 2 === 1, naturalsIterable),
    ),
  ),
);
