import * as R from 'ramda';

const array = [1, 2, 3];

// * chain:: 매개변수가 1개
R.pipe(
  //
  R.chain(n => [n, n]),
  R.tap(n => console.log(n)),
)(array);
// [ 1, 1, 2, 2, 3, 3 ]

// * chain:: 매개변수가 2개
R.pipe(
  //
  R.chain(R.append, R.head),
  R.tap(n => console.log(n)),
)(array);
// [ 1, 2, 3, 1 ]

// ! chain()은 매개변수가 하나일 때는 아래의 flatMap 과 같이 동작
export const flatMap = f =>
  R.pipe(
    //
    R.map(f),
    R.flatten,
  );

R.pipe(
  //
  flatMap(n => [n, n]),
  R.tap(n => console.log(n)),
)(array);
// [ 1, 1, 2, 2, 3, 3 ]

// ! 매개변수가 2개일 때는 chainTwoFunc 함수와 같이 동작
const chainTwoFunc = (firstFn, secondFn) => x => firstFn(secondFn(x), x);

R.pipe(
  chainTwoFunc(R.append, R.head),
  R.tap(n => console.log(n)),
)(array);
// [ 1, 2, 3, 1 ]
