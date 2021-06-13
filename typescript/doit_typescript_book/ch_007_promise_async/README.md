# ch_007 Promise와 async/await

비동기 api를 사용하는 코드를 쉽게 작성하게 도와주는 Promise class와 async/awiat 구문

### tsconfig.json

 아래 option true 필요

```json
...
"downlevelIteration" : true,
...
```



## 007-1. 비동기 콜백 함수

### 동기와 비동기 API

nodeJS는 파일 시스템과 관련된 fs 패키지 제공. 해당 패키지는 동기와 비동기 버전으로 나누어 제공

​	e.g. 동기 - `readFileSync`, 비동기 - `readFile`

```typescript
import { readFile, readFileSync } from 'fs';

// synchronous
console.log('read package.json using sync api...(동기)');
const buffer: Buffer = readFileSync('./package.json'); // 파일을 읽는 동안 일시 대기
console.log(buffer.toString());

//asyncronous
readFile('./package.json', (error: Error, buffer: Buffer) => {
  console.log('read package.json using async api... (비동기)');
  console.log(buffer.toString());
});

// Promise, async/await
// promise 객체 생성
const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error);
      else resolve(buffer.toString());
    });
  });

// async/await로 호출
(async () => {
  const content = await readFilePromise('./package.json');
  console.log('read package.json using async api... (Promise and async/await)');
  console.log(content);
})();

```

- **동기 방식**: 파일 내용을 모두 읽을 때까지 프로그램의 동작을 잠시 멈추게 된다.
- **비동기 방식**: 프로그램의 동작을 멈추지 않는 대신, 나중에 올 결과를 콜백함수로 얻게 하는 방식
  - 비동기 콜백 함수 asynchronous callback function : 일반 함수와 달리 API의 물리적 동작결과(result) 를 수신하는 목적으로 사용

### Buffer class

- nodeJS 실행 환경에서는 운영체제 파일 시스템에 있는 파일을 읽을 수 있다.
- path의 파일을 읽어서 **Buffer**라는 타입으로 전달
  - Buffer 는 nodeJS가 제공하는 클래스로 바이너리 데이터를 저장하는 기능 수행
  - Buffer의 데이터를 문자열로  만들 때, Buffer의 toString() 메소드 사용

### readFileSync

```typescript
import {readFileSync} from 'fs'
readFileSync(path: string): Buffer
```

- nodeJS에서 '...Sync'는 동기 방식으로 동작(동기: 작업이 종료될 때까지 프로그램 대기)

### readFile

```typescript
import { readFile } from 'fs'
readFile(filepath, callback: (error: Error, buffer: Buffer) => void)
```

- callback : api의 동작 결과를 수신하는 용도로 사용

  callback 함수의 첫 번째 인자로 Error 인터페이스, 두 번째 인자로 Buffer 클래스를 받는다

### 단일 스레드와 비동기 API

js는 단일 스레드로 동작하므로, 될 수 있으면  동기 API를 사용하지 않아야 한다.

동기 방식은 코드의 흐름을 이해하기 쉽기 때문에 작성 또한 쉽게 해주지만, 프로그램의 **반응성**을 떨어뜨린다.

따라서 js, ts는 항상 비동기 방식으로 api를 사용해 프로그램의 반응성을 훼손하지 않아야 한다.

### callback 지옥

```typescript
import { readFile } from 'fs';

// ! readFile 의 콜백에서 다시 readFile 호출

// outer readFile
readFile('./package.json', (err: Error, buffer: Buffer) => {
  if (err) throw err;
  else {
    const content: string = buffer.toString();
    console.log(content);

    // inner readFile
    readFile('./tsconfig.json', (err: Error, buffer: Buffer) => {
      if (err) throw err;
      else {
        const content: string = buffer.toString();
        console.log(content);
      }
    });
  }
});
```

- Promise로 이 지옥을 탈출하자!

## 007-2. Promise 이해하기

ES5에 정식 기능으로 추가

### Promise class

js에서 프로미스는 `Promise`라는 이름의 class이다. 따라서 `new` 키워드로 Promise 객체를 만들어야 한다.

Promise 클래스의 생성자 인자로 콜백함수를 전달해야 한다.

```typescript
const promise = new Promise(callback)
```

이 때 callback 함수는 resolve, reject라는 두 개의 매개변수를 가진다.

따라서 promise 객체는 다음과 같이 만들 수 있다.

```typescript
const promise = new Promise((resolve, reject) => {
  ...
})
```

typescript Promise는 다음처럼 제네릭 클래스 형태로 사용

- 제네릭으로 설정해두는 타입은 api 요청에 기대하는 데이터의 타입

```typescript
const numPromise: Promise<number> = new Promise<number>(callback)
const stringPromise: Promise<string> = new Promise<string>(callback)
const arrayPromise: Promise<number[]> = new Promise<number[]>(callback)
```

typescript의 Promise의 callback 함수는 다음과 같이 resolve 와 reject 함수를 매개변수로 받는 형태이다.

```typescript
new Promise<T>((
  resolve: (successValue: T) => void, 
  reject: (any) => void
) => {
  // callback body 구현
});

```



### resolve와 reject 함수

Promise 객체 구현부

```typescript
import { readFile } from 'fs';

// 구현부
const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error); // reject -> 사용부 catch()의 콜백으로 전달
      else resolve(buffer.toString()); // resolve -> 메소드 체인 then()의 콜백으로 전달
    });
  });
```



Promise  객체 사용부

```typescript

// 사용부 - then, catch, finally
readFilePromise('./package.json') //
  .then((content: string) => {
    console.log(content);
    return readFilePromise('./tsconfig.json');
  })
  .then((content: string) => {
    console.log(content);
    return readFilePromise('.');
  })
  .catch((error: Error) => console.log('error: ', error.message))
  .finally(() => {
    console.log('프로그램 종료 ...');
  });

```



### Promise.resolve()

- Promise 클래스는 resolve라는 스태틱 메소드를 제공
- resolve(값) 형태로 호출하면 항상 이 '값'은 then 메소드에서 얻을 수 있다.

```typescript
Promise.resolve('result!') //
  .then((value) => console.log(value)); 

Promise.resolve(123) //
  .then((value) => console.log(value));

Promise.resolve(['a', 'b', 'c']) //
  .then((value) => console.log(value));

Promise.resolve({ name: 'James', age: 32 }) //
  .then((value) => console.log(value));

```



### Promise.reject()

- Promise 클래스는 reject라는 스태틱 메소드 제공
- reject의 파라미터로 전달되는 Error 타입 객체는  사용부의
-  catch문 콜백함수의 인자로 얻을 수있다.

### Promise.all()

- Array의 every인스턴스 메소드와 유사하게 동작( Promise[] 내 모두 resolve를 반환해야, resolve 반환)

  ```typescript
  all(프로미스_객체_배열: Promise[]): Promise<해소된_값들의_배열(혹은 any)>
  ```

- Promise 객체들을 배열 형태로 받아서, 모든 객체를 대상으로 resolve된 값들의 배열로 만들어 준다

- all 메소드는 Promise 객체를 반환하므로 resolve된 값들의 배열은 then 메소드를 호출해서 얻어야 한다.

- 만약, 배열에 담긴 Promise 객체 중 reject 객체가 발생하게 되면, 더 이상 기다리지 않고, 해당 거절된 값을 담은 Promise.reject 객체를 반환한다.

```typescript
// ! Promise.all()
// 구현부
const getAllResolveResult = <T>(promises: Promise<T>[]) => Promise.all(promises);

// 정상 실행부
getAllResolveResult<any>([Promise.resolve(true), Promise.resolve('hello'), Promise.resolve(123)]).then((result) => {
  console.log(result);
});

// 에러 발생 실행부
getAllResolveResult<any>([Promise.reject(new Error('error')), Promise.resolve('hello'), Promise.resolve(123)])
  .then((result) => {
    console.log(result); // 호출되지 않음
  })
  .catch((error) => {
    console.log('error: ', error.message);
  });

```



### Promise.race()

```typescript
race(프로미스_객체_배열: Promise[]): Promise<가장_먼저_해소된_객체의_값_타입(또는 Error)>
```

- Array의 some 인스턴스 메소드와 유사(하나라도 만족하면 true return)
- Promise[] 중 하나라도 resolve 된다면, 이 값을 담아 resolve 객체 반환



007-3. async / await 구문

