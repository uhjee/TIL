import * as R from 'ramda';

// 매개변수에 콜백이 1개
const callAndAppend = R.pipe(
  R.ap([R.multiply(2)]), // 배열에 콜백이 한 개
  R.tap(a => console.log(a)),
);

const input = [1, 2, 3];

const result = callAndAppend(input); // [ 2, 4, 6 ]

// 매개변수에 콜백이 2개
const callAndAppend2 = R.pipe(
  //
  R.ap([R.multiply(2), R.add(10)]), // 배열에 콜백이 두 개
  R.tap(a => console.log(a)),
);

const result2 = callAndAppend2(input); // [ 2, 4, 6, 11, 12, 13 ]

// 예제 2
const repeat = (N, cb) => R.range(1, N + 1).map(n => cb);

const callAndAppend3 = R.pipe(
  R.ap(repeat(3, R.identity)), // ! R.identity를 3번 반복
  R.tap(a => console.log(a)),
);

const result3 = callAndAppend3(input); // [  1, 2, 3, 1, 2,  3, 1, 2, 3]
