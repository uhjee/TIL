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

/**
 * 자연수 이터레이터
 * @param end 종료 값
 * @returns 자연수 이터레이터
 */
function* naturals(end = Infinity): IterableIterator<number> {
  let num = 1;
  while (true) {
    if (num > end) return;
    yield num++;
  }
}

// const naturalsIterable = naturals(10);

// console.log(
//   reduce(
//     (acc, a) => (acc += a),
//     map(
//       (a) => a * a,
//       filter((a) => a % 2 === 1, naturalsIterable),
//     ),
//   ),
// );

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
/**
 * 이터레이터 프록시 팩토리 (헬퍼 함수)
 * @param iterable 이터레이터
 * @returns 이터레이터 프록시
 */
function fx<A>(iterable: Iterable<A>): FxIterable<A> {
  return new FxIterable(iterable);
}

// fx(['a', 'b'])
//   .map((i) => i.toUpperCase())
//   .filter((i) => i.includes('A'))
//   .forEach((i) => console.log(i));

// const num = fx(naturals(5))
//   .filter((n) => n % 2 === 1)
//   .map((n) => n * 10)
//   .reduce((a, b) => a + b, 100);

// console.log(num);

const sorted = fx([5, 2, 3, 1, 4, 5, 3])
  .filter((a) => a % 2 === 1)
  .map((a) => a * 10)
  .to((iterable) => [...iterable])
  .sort((a, b) => a - b);

console.log(sorted);

const set2 = fx([5, 2, 3, 1, 4, 5, 3])
  .filter((a) => a % 2 === 1)
  .map((a) => a * 10)
  .chain((iterable) => new Set(iterable))
  .reduce((a, b) => a + b);
console.log(set2);
