import * as R from 'ramda';

// * ramda 에서 제공하는 predicate 들
// R.lt(a)(b);  a < b
// R.lte(a)(b); a <= b
// R.gt(a)(b);  a > b
// R.gte(a)(b); a >= b

// * 3보다 같거나 큰 수 뽑기
R.pipe(
  R.filter(R.lte(3)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));
// [  3, 4, 5, 6,  7, 8, 9 ]

//* 7보다 작은 수 뽑기
R.pipe(
  R.filter(R.gt(7)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));

// * 3보다 같거나 크고 7보다 작은 수 뽑기
R.pipe(
  R.filter(R.lte(3)),
  R.filter(R.gt(7)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));
