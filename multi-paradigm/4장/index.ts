import { delay } from './async_iterable_functions';

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
