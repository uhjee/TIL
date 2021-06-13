// ! Promise.all()
// 구현부
const getAllResolveResult = <T>(promises: Promise<T>[]) => Promise.all(promises);

// 정상 실행부
getAllResolveResult<any>([Promise.resolve(true), Promise.resolve('hello'), Promise.resolve(123)]).then((result) => {
  console.log(result);
});

// 에러 발생 실행부
// getAllResolveResult<any>([Promise.reject(new Error('error')), Promise.resolve('hello'), Promise.resolve(123)])
//   .then((result) => {
//     console.log(result); // 호출되지 않음
//   })
//   .catch((error) => {
//     console.log('error: ', error.message);
//   });

// ! race
Promise.race([Promise.resolve(true), Promise.resolve('hello')]).then((value) => {
  console.log(value);
});

//  resolve 객체 -> reject 객체
Promise.race([Promise.resolve(true), Promise.reject(new Error('error'))])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    // 실행 안됨
    console.log('error!: ', error);
  });
