import * as R from 'ramda';
import { selectRange } from './allPass_anyPass';

export const notRange = (min: number, max: number) =>
  //
  R.pipe(
    selectRange(min, max),
    R.not, // not 으로 반환값 반전
  );

R.pipe(
  R.filter(notRange(3, 6 + 1)),
  R.tap((n) => console.log(n)),
)(R.range(1, 10));
