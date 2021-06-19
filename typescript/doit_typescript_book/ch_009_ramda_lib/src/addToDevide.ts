import * as R from 'ramda';

/**
 * R.add(a: number)(b: number); // a + b
 * R.subtract(a: number)(b: number); // a - b
 * R.multiply(a: number)(b: number); // a * b
 * R.divide(a: number)(b: number); // a/b
 */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = R.pipe(
  //
  R.map(R.multiply(100)),
  R.map(R.subtract(100)),
  R.tap((i) => console.log(i)),
  R.sum,
)(numbers);

console.log(result);

// subtract, divide 는 매개변수의 순서에 따라 값이 달라진다.
const subtract10 = R.subtract(10);

R.pipe(
  //
  R.map(subtract10), // 10 - value
  R.tap((n) => console.log(n)),
)(R.range(1, 10));

// ! R.flip : 매개변수의 순서를 거꾸로 변경한다.
const subR = R.flip(R.subtract);

const subR10 = subR(10);

R.pipe(
  //
  R.map(subR10), // value - 10
  R.tap((n) => console.log(n)),
)(R.range(1, 9 + 1));
