import { chunk, delay, fromAsync, fx } from '../iterable_functions.js';

/**
 * delay 함수 사용 예제
 */
// async function test() {
//   console.time('test');

//   const result = await delay(1000, 'Hello, world!');
//   console.log(result);
//   const result2 = await delay(2000, 40);
//   console.log(result2);
//   console.timeEnd('test');
// }

// test();

// ------------------------------------------------------------

/**
 * Promise.race 사용 예제
 */

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

// async function test() {
//   const result = await Promise.race([getFriends(), delay(5000, 'timeout')]);
//   console.log(result);
// }

// test();

// ------------------------------------------------------------

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

// async function test() {
//   await renderFriendsPicker();
// }

// test();

// ------------------------------------------------------------

/**
 * Promise.all 사용 예제
 */

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

const promiseAllTest = async () => {
  console.time('test');
  try {
    const files = await Promise.all([
      getFile('img.png', 500),
      getFile('index.html', 1500),
      getFile('book.pdf', 1000),
      delay(1000, Promise.reject('파일 다운로드 실패')),
    ]);
    console.log(files);
  } catch (error) {
    console.log('오잉');
    console.log(error);
  } finally {
    console.timeEnd('test');
  }
};

// promiseAllTest();

// ------------------------------------------------------------

/**
 * Promise.allSettled 사용 예제
 */

// const files = await Promise.allSettled([
//   getFile('img.png', 500),
//   getFile('index.html', 1500),
//   getFile('book.pdf', 1000),
//   Promise.reject('파일 다운로드 실패'),
// ]);
// console.log(files);

// ------------------------------------------------------------

/**
 * 3개씩 n번씩 실행하는 예제
 * @param fs 실행할 함수 배열 (promise 객체 생성 반환하는 함수)
 * @param limit 한번에 실행할 함수 개수
 * @returns 실행 결과 배열
 */
async function executeWithLimit1<T>(
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
    results.push(...batchResults); // 평탄화
  }

  return results;
}

async function test() {
  console.time('test');
  const files: File[] = await executeWithLimit1(
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

// await test();

// console.log([...chunk(2, [1, 2, 3, 4, 5])]);
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

async function test1() {
  console.time('test1');
  const files: File[] = await executeWithLimit(
    [
      () => getFile('1-img.png'),
      () => getFile('2-index.html'),
      () => getFile('3-book.pdf'),
      () => getFile('4-img.png'),
      () => getFile('5-index.html'),
      () => getFile('6-book.pdf'),
      () => getFile('7-book.pdf'),
    ],
    3,
  );
  console.log(files);
  console.timeEnd('test1');
}

await test1();
