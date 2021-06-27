import * as R from 'ramda';

const T = value =>
  R.pipe(
    //
    R.applyTo(value),
    R.tap(value => console.log(value)),
  );

const value100 = T(100); // 2차 고차함수: 일반 함수를 반환

const sameValue = value100(R.identity); // 100
const add1Value = value100(R.inc); // 101
