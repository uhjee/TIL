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

/**
 * 이터레이터의 첫 limit개의 요소를 반환하는 함수
 * @param limit 반환할 요소의 개수
 * @param iterable 이터레이터
 * @returns 이터레이터의 첫 n개의 요소
 */
function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
    if (--limit === 0) break;
  }
}

/**
 * 반복 가능한 객체의 첫 요소를 반환하는 함수
 * @param iterable 반복 가능한 객체
 * @returns 반복 가능한 객체의 첫 요소
 */
const head = <A>(iterable: Iterable<A>): A | undefined =>
  iterable[Symbol.iterator]().next().value;

/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 * @returns 반복 가능한 객체의 각 요소에 대해 함수를 실행한 결과
 */
function find<A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined {
  return head(filter(f, iterable));
}

/**
 * 반복 가능한 객체의 각 요소에 대해 함수를 실행하는 함수 (some, every 공통 로직 추상화)
 * @param accumulator 누적 값을 계산하는 함수
 * @param acc 초기값
 * @param taking 조건을 만족하는지 확인하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 * @returns 반복 가능한 객체의 각 요소에 대해 함수를 실행한 결과
 */
function accumlateWith<A>(
  accumulator: (a: boolean, b: boolean) => boolean,
  acc: boolean,
  taking: (a: boolean) => boolean,
  f: (a: A) => boolean,
  iterable: Iterable<A>,
): boolean {
  return fx(iterable).map(f).filter(taking).take(1).reduce(accumulator, acc);
}

/**
 * 반복 가능한 객체의 모든 요소가 조건을 만족하는지 확인하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 * @returns 반복 가능한 객체의 모든 요소가 조건을 만족하는지 여부
 */
function every<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
  // return fx(iterable)
  //   .map(f)
  //   .filter((a) => !a)
  //   .take(1)
  //   .reduce((a, b) => a && b, true);
  return accumlateWith(
    (a, b) => a && b,
    true,
    (a) => !a,
    f,
    iterable,
  );
}

/**
 * 반복 가능한 객체의 일부 요소가 조건을 만족하는지 확인하는 함수
 * @param f 반복 가능한 객체의 각 요소에 대해 실행할 함수
 * @param iterable 반복 가능한 객체
 * @returns 반복 가능한 객체의 일부 요소가 조건을 만족하는지 여부
 */
function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
  return accumlateWith(
    (a, b) => a || b,
    false,
    (a) => a,
    f,
    iterable,
  );
}

/**
 * 여러 반복 가능한 객체를 하나로 합치는 함수
 * @param iterables 반복 가능한 객체들
 * @returns 합쳐진 반복 가능한 객체
 */
function* concat<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterable of iterables) {
    yield* iterable; // yield* 연산자는 반복 가능한 객체의 각 요소를 순회하며 반환하는 연산자
  }
}

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

/**
 * 비동기 작업을 지연시키는 함수
 * @param time 지연 시간
 * @param value 반환할 값
 * @returns 지연된 값을 반환하는 Promise
 */
function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

/**
 * 반복 가능한 객체를 지정된 크기의 배열로 나누는 함수
 * @param size 배열의 크기
 * @param iterable 반복 가능한 객체
 * @returns 배열의 크기만큼 반복 가능한 객체의 요소를 배열로 반환하는 이터레이터
 */
function* chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> {
  const iterator = iterable[Symbol.iterator](); // 이터러블을 이터레이터로 변환
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]: () => iterator,
      }),
    ];
    if (arr.length) yield arr; // 배열의 길이가 0이 아니면 배열을 반환
    if (arr.length < size) break;
  }
}

/**
 * 비동기 이터러블로부터 새로운 배열 인스턴스를 생성해 반환하는 함수
 * @param iterable 비동기 이터러블
 * @returns 비동기 이터러블의 요소를 배열로 변환한 인스턴스
 */
async function fromAsync<T>(
  iterable: Iterable<Promise<T>> | AsyncIterable<T>,
): Promise<T[]> {
  const arr: T[] = [];
  for await (const a of iterable) {
    // 이터레이터 소비
    arr.push(a);
  }
  return arr;
}

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

  take(limit: number): FxIterable<A> {
    return fx(take(limit, this));
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

  chunk(size: number): FxIterable<A[]> {
    return fx(chunk(size, this));
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

// 이 파일을 모듈로 만들어 전역 스코프 충돌을 방지
export {
  fx,
  FxIterable,
  filter,
  map,
  reduce,
  forEach,
  take,
  head,
  find,
  every,
  some,
  delay,
  chunk,
  fromAsync,
};
