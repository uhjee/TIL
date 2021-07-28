const a = number =>
  new Promise((resolve, reject) => {
    if (number > 4) {
      reject(`${number}가 4보다 큽니다.`);
      return;
    }

    setTimeout(() => {
      console.log('A');
      resolve();
    }, 1000);
  });
const b = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log('B');
      resolve();
    }, 1000);
  });
const c = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log('C');
      resolve();
    }, 1000);
  });
const d = () =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log('D');
      resolve();
    }, 1000);
  });

  // ! Promise 객체 자체 메소드 사용(then, catch, finally)
const test = () => {
  a(3)
    .then(() => b())
    .then(() => c())
    .then(() => d())
    .then(() => {
      console.log('Done!');
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      console.log('finally 무조건 실행');
    });
};

// test();

// ! async - await 구문의 예외처리
const asyncTest = async () => {
  try {
    const Ares = await a(7);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('무조건 실행');
  }
}

asyncTest();