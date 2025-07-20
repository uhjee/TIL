# 비동기 프로그래밍

## 4.1 값으로 다루는 비동기

- 비동기 프로그래밍: 특정 작업이 완료될 때까지 기다리지 않고 다른 작업을 계속 수행하는 프로그래밍 방식. 주로 IO 작업에 활용
  - 싱글 스레드 기반의 비동기 IO를 통해 프로그램의 동시 실행 제어

### 4.1.1 Promise

- Promise: 비동기 작업의 결과를 값으로 다룰 수 있게 하는 객체이자 규약
  - 비동기 작업의 성공 또는 실패를 처리하는 데 사용하는 객체
  - 비동기 작업의 완료 여부와 관계없이 즉시 객체 생성하여 값으로 다룰 수 있게 하고 비동기 작업의 결과가 필요한 시점에 꺼내보거나 에러처리 할 수 있도록 함

#### Promise를 반환하는 delay 함수

- delay 함수: time 만큼 대기한 후 value로 받은 값을 반환하는 Promise를 생성하여 즉시 반환하는 함수
  ```ts
  /**
   * 비동기 작업을 지연시키는 함수
   * @param time 지연 시간
   * @param value 반환할 값
   * @returns 지연된 값을 반환하는 Promise
   */
  function delay<T>(time: number, value: T): Promise<T> {
    return new Promise((resolve) => setTimeout(resolve, time, value));
  }
  ```

### 4.1.2 new Promise() 를 직접 사용해본 경험

- Promise.all(): 병렬적으로 여러 비동기 요청을 보내야 하고, 모든 요청이 이행된 이후에 처리가 필요한 경우 동시성 제어 목적으로 사용

### 4.1.3 Promise.race

- 병렬로 실행된 여러 Promise 중 가장 먼저 완료된 Promise의 결과나 에러 반환하는 함수
- 해당 Promise의 수행 결과가 `resolve`, `reject` 인지 여부는 판단하지 않고, 가장 빠르게 완료된 Promise만 반환

### 4.1.4 IO 작업에 타임아웃 설정하기

```ts
/**
 * 랜덤한 값을 반환하는 함수
 * @param a 반환할 값 1
 * @param b 반환할 값 2
 * @returns 랜덤한 값
 */
function getRandomValue<T>(a: T, b: T): T {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? a : b;
}

type User = {
  name: String;
};

function getFriends(): Promise<User[]> {
  return delay(getRandomValue(60, 6000), [
    { name: 'John' },
    { name: 'Jane' },
    { name: 'Doe' },
  ]);
}

async function test() {
  const result = await Promise.race([getFriends(), delay(5000, 'timeout')]);
  console.log(result);
}

test();
```

### 4.1.5 응답 속도에 따라 다른 전략으로 UI 렌더링

```ts
function toggleLoadingIndicator(show: boolean): void {
  if (show) {
    console.log('append loading....');
  } else {
    console.log('remove loading....');
  }
}

async function renderFriendsPicker(): Promise<void> {
  const friendsPromise = getFriends();
  const result = await Promise.race([friendsPromise, delay(100, 'isSlow')]);

  /**
   * 타임아웃 처리
   * 타임아웃 시간이 지나면 로딩 인디케이터 추가
   * 타임아웃 시간이 지나기 전에 친구 목록이 준비되면 로딩 인디케이터 제거
   */
  if (result === 'isSlow') {
    toggleLoadingIndicator(true);
    await friendsPromise;
    toggleLoadingIndicator(false);
  }

  const friends = await friendsPromise;
  console.log(
    '친구 목록 렌더링: ',
    friends.map(({ name }) => `<li> ${name} </li>`),
  );
}

async function test() {
  await renderFriendsPicker();
}

test();
```

### 4.1.6 Promise.all

- 주어진 모든 Promise가 이행될 때까지 기다렸다가 모든 결과를 배열로 반환하는 함수
- 주어진 Promise 중 하나라도 reject된다면 `Promise.all`은 즉시 거부되고 거부 이유를 반환

```ts
type File = {
  name: string;
  body: string;
  size: number;
};

/**
 * 비동기적으로 파일을 가져오는 것을 표현하는 함수ㅕ\
 * @param name 파일 이름
 * @param size 파일 크기
 * @returns 파일 정보
 */
function getFile(name: string, size = 1000): Promise<File> {
  return delay(size, { name, body: '...', size });
}

const test = async () => {
  console.time('test');
  try {
    const files = await Promise.all([
      getFile('img.png', 500),
      getFile('index.html', 1500),
      getFile('book.pdf', 1000),
      delay(1000, Promise.reject('error')),
    ]);
    console.log(files);
  } catch (error) {
    console.log('오잉');
    console.log(error);
  } finally {
    console.timeEnd('test');
  }
};

test();
```

### 4.1.7 Promise.allSettled

- 주어진 모든 Promise가 완료될 때까지 기다린 후 각 Promise의 수행 결과 상태를 객체로 담아 반환하는 함수
- 모든 Promise의 완료 상태를 확인하고 싶을 때 유용
- Promise.all 과의 차이점
  - Promise.all: 주어진 Promise 중 하나라도 `reject`인 경우 에러 반환
  - Promise.allSettled: 주어진 Promise의 각각의 상태 반환

```ts
const files = await Promise.allSettled([
  getFile('img.png', 500),
  getFile('index.html', 1500),
  getFile('book.pdf', 1000),
  Promise.reject('파일 다운로드 실패'),
]);
console.log(files);
```

출력 결과

```ts
[
  {
    status: 'fulfilled',
    value: { name: 'img.png', body: '...', size: 500 },
  },
  {
    status: 'fulfilled',
    value: { name: 'index.html', body: '...', size: 1500 },
  },
  {
    status: 'fulfilled',
    value: { name: 'book.pdf', body: '...', size: 1000 },
  },
  { status: 'rejected', reason: '파일 다운로드 실패' },
];
```

### 4.1.8 Promise.any

- 주어진 Promise 중 가장 먼저 '`resolve`'된 Promise 값 반환
- Promise.race 와의 차이점
  - Promise.race: 가장 먼저 수행된 Promise를 반환(결과가 resolve, reject 인지 여부를 따지지 않음)

---

## 4.2 지연성으로 다루는 비동기

### 4.2.1 Promise 실행을 지연하려면

- Promise 객체 6개를 3개씩 2번 나누어서 수행하는 함수 작성
- Promise 객체는 생성되는 즉시 실행됨
- Promise.all, race 등 비동기 헬퍼 함수들은 실행 시점을 제어하지 않음, 단순히 실행된 Promise 객체를 반환하기 위한 함수

```ts
/**
 * 3개씩 n번씩 실행하는 예제
 * @param fs 실행할 함수 배열 (promise 객체 생성 반환하는 함수)
 * @param limit 한번에 실행할 함수 개수
 * @returns 실행 결과 배열
 */
async function executeWithLimit<T>(
  fs: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = [];

  // 전체 배열을 순회하면서 limit 단위로 그룹화
  for (let i = 0; i < fs.length; i += limit) {
    const batchPromises: Promise<T>[] = [];

    // limit 단위로 그룹화된 작업을 생성
    for (let j = 0; j < limit && i + j < fs.length; j++) {
      batchPromises.push(fs[i + j]()); // Promise 객체 수행
    }
    ``;
    // 그룹화된 작업을 병렬로 실행하고 결과를 수집
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

async function test() {
  console.time('test');
  const files: File[] = await executeWithLimit(
    [
      () => getFile('img.png'),
      () => getFile('index.html'),
      () => getFile('book.pdf'),
      () => getFile('img.png'),
      () => getFile('index.html'),
      () => getFile('book.pdf'),
    ],
    3,
  );
  console.log(files);
  console.timeEnd('test');
}

await test();
```

### 4.2.3 함수형으로 구현한 동시성 핸들링 함수

### chunk(size, iterable) 함수

- n개씩 그룹화 하는 리스트 프로세싱 함수

```ts
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
```

### chunk를 활용해 executeWithLimit 함수 구현

- 프로세스 핵심: 지연성
- fromAsync 내부의 `for await...of` 구문에서 처음으로 소비될 때 mak, chunk, map 함수가 수행됨(지연평가)

```ts
/**
 * 비동기 함수를 동시에 실행하는 함수
 * @param fs 비동기 함수 배열
 * @param limit 동시에 실행할 함수 개수
 * @returns 비동기 함수 실행 결과 배열
 */
const executeWithLimit = <T>(
  fs: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> =>
  fx(fs)
    .map((f) => f()) // 비동기 함수 지연 평가
    .chunk(limit) // n개씩 그룹화
    .map((ps) => Promise.all(ps)) // 3개씩 대기하도록 Promise.all로 감싸기
    .to(fromAsync) // Promise.all들의 결과 꺼내기
    .then((arr) => arr.flat()); // 평탄화

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
```
