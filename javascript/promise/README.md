- 선언과 호출의 분리를 기억하자...
- then 내부 콜백함수의 인자:  이전 then 의 return 값 또는 이전 promise 객체의  resolve()의 인자

# Promise()

**싱글 스레드**로 동작하는 javascript는 **비동기적 코드 실행**이 필수적이다. 

**비동기적 코드 실행**은 '특정 코드의 실행이 완료될 때까지 기다리지 않고, 다음 코드를 수행하는 자바스크립트의 특성'이다.

비동기로 동작하는 자바스크립트의 실행 flow를 제어하기 위한 방법 중 하나로 Promise가 있다.

비동기 요청이 미래에 맞이할 상태를 대변한다.

1. State: resolve 또는 reject 될 때까지 상태를 유지하고 있다.
2. Producer와 Consumer 가 분리된다.

Promise 객체는 생성될 때, executor(callback 함수)를 실행시킨다.

```jsx
'use strict';

// Promise : javscript에서 제공하는 비동기 처리 객체
//    1. State: pending -> fulfilled or rejected 될 때까지
//    2. Producer, Consumer : 둘의 role이 separate 되어있다.

// 1. Producer
// ⚠️ When new Promise is created, the executor runs automatically!!!
const promise = new Promise((resolve, reject) => {
  // e.g. network, read files
  setTimeout(() => {
    resolve('jee');
  }, 3000);
});

// 2. Consumer: then, catch, finally
promise //
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally!');
  });

// 3. promise chaining(Promise Obj 는 Promise Obj를 return 한다)
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

fetchNumber //
  .then((result) => result * 2)
  .then((result) => result * 3)
  .then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result - 1);
      }, 2000);
    });
  })
  .then((result) => {
    console.log(result);
  });

// 4.Error handling
// Promise 가 바로 실행되지 않도록 고차함수로 관리
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hen');
    }, 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      hen === 'hen' ? resolve('egg') : reject(new Error('error! its not hen'));
    }, 3000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('nice cooked egg');
    }, 1000);
  });

getHen() //
  // .then((res) => getEgg(res))  // 아래와 같이 생략 가능
  .then(getEgg)
  .catch(new Error('not hen!')) // getEgg 의 catch문 작성 가능
  .then(cook)
  .then((res) => {
    console.log(res);
  });
```

# callback to promise!

### callback 함수로 작성된 async 관리

```jsx
// Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if ((id === 'jee' && password === 'haeng') || (id === 'jee' && password === 'jee')) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'jee') {
        onSuccess({ name: 'jee', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your passrod');
userStorage.loginUser(
  id,
  password,
  // callback 1!
  (user) => {
    userStorage.getRoles(
      user,
      // callback 1-1!
      (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
      },
      // callback 1-2!
      (error) => {
        console.log(error);
      },
    );
  },
  // callback 2!
  (error) => {
    console.log(error);
  },
);
```

### 위 코드를 Promise를 사용해 변경

```jsx
'use strict';

class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((id === 'je' && password === 'haeng') || (id === 'jee' && password === 'jee')) {
          resolve(id);
        } else {
          reject(new Error('not found!'));
        }
      }, 2000);
    });
  }

  getRoles(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === 'jee') {
          resolve({ name: 'jee', role: 'admin' });
        } else {
          reject(new Error('no access'));
        }
      }, 3000);
    });
  }
}

const userStorage = new UserStorage();

const id = prompt('이름!');
const password = prompt('비번!');

userStorage //
  .loginUser(id, password)
  .then(userStorage.getRoles)
  .then((userInfo) => {
    console.log(`${userInfo.name}은 ${userInfo.admin}이야!`);
  })
	.catch(console.log);
```



[[출처 ]dream-ellie/learn-javascript](https://github.com/dream-ellie/learn-javascript/blob/master/notes/async/promise.js)
