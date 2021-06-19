import * as R from 'ramda';

type NumberToBooleanFunc = (n: number) => boolean;

// * min 과 같거나 크고 max보다 작은 범의의 수인지 판단하는 selectRange
export const selectRange = (min: number, max: number): NumberToBooleanFunc =>
  //
  R.allPass([R.lte(min), R.gt(max)]);

R.pipe(
  R.filter(selectRange(3, 6 + 1)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));
