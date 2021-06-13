console.log('start');

// new Promise<T>((resolve: (successValue: T) => void, reject: (any) => void) => {});

const promise1 = new Promise<string>(
  (
    //
    resolve: (successValue: string) => void,
    reject: (any) => void,
  ) => {
    setTimeout(() => {
      console.log('promise1!');
      resolve('promise1 successValue');
    }, 3000);
  },
);

promise1.then((res) => {
  console.log(res);
});
