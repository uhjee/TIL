import * as R from 'ramda';
// 지수 연산자 **
// x의 n승 => x ** n

// * type 선언
type NumberToNUmberFunc = (number) => number;

// * 001. typescript 로 구현

export const f =
  (a: number, b: number, c: number): NumberToNUmberFunc =>
  //
  (x: number): number =>
    a * x ** 2 + b * x + c;

// * 002. ramda 라이브러리 사용
// R.add 는 2차 고차함수

// 제곱을 구하는 2차함수 exp(N)(x) -> x의 N승
const exp =
  (N: number) =>
  (x: number): number =>
    x ** N;

const square = exp(2);

// 괄호의 대 환장 파티...
export const fUsingRamda =
  (a: number, b: number, c: number): NumberToNUmberFunc =>
  (x: number): number =>
    R.add(
      //
      R.add(
        //
        R.multiply(a)(square(x)),
      )(R.multiply(b)(x)),

      c,
    );

console.log(fUsingRamda(2, 2, 2)(2));
