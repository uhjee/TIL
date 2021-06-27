import * as R from 'ramda';

// 2차 고차함수를 매개변수로 받아, 매개변수의 순서를 바꿔준다.
const flip = cb => a => b => cb(b)(a);

// subtract 순서 변경
const reverseSub = flip(R.subtract);

const newArr = R.pipe(
  //
  R.map(reverseSub(10)), // value - 10
  R.tap(a => console.log(a)), // [ -9, -8, -7, -6, -5 ]
)(R.range(1, 5 + 1));
