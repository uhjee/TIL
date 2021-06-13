Promise.resolve('result!') //
  .then((value) => console.log(value));

Promise.resolve(123) //
  .then((value) => console.log(value));

Promise.resolve(['a', 'b', 'c']) //
  .then((value) => console.log(value));

Promise.resolve({ name: 'James', age: 32 }) //
  .then((value) => console.log(value));
