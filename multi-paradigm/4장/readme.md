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

병렬로 실행된 여러 Promise 중 가장 먼저 완료된 Promise의 결과나 에러 반환

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
