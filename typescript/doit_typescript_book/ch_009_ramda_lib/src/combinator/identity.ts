import * as R from 'ramda';
import { flatMap } from './chain';

// 반드시 함수가 있어야 하는 곳에 위치할 때 위력을 발휘
const identity = x => x;

const unnest = flatMap(R.identity);

const arr = [[1], [2, 3], [4]];
R.pipe(
  //
  unnest,
  R.tap(a => console.log(a)), // [ 1, 2, 3, 4 ]
)(arr);

// ! 5000원 이상일 경우 500원 할인

type NumToNumFunc = (n: number) => number;

// 2차 고차 함수
const applyDiscount = (minimum: number, discount: number): NumToNumFunc =>
  //
  R.pipe(
    //
    R.ifElse(
      R.flip(R.gte)(minimum),
      R.flip(R.subtract)(discount), // if에 해당하는 return 값
      R.identity, // else 에 해당하는 return 값
    ),
    R.tap(a => console.log(a)),
  );

const calcPrice = applyDiscount(5000, 500);

const discountedPrice = calcPrice(6000); // 5500
const notDiscountedPrice = calcPrice(4500); // 4500
