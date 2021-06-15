import { inc, add, add3 } from './high-order-func';
import { FirstOrderFunc, SecondOrderFunc } from './func-signature';

console.log(
  //
  inc(1), // 1차 함수의 호출이기 때문에 괄호 1번만 감싼다
);

console.log(
  //
  add(1)(2), // 2차 고차 함수의 호출, 괄호 2번 curry
);

console.log(
  //
  add3(1)(2)(3), // 3차 고차 함수의 호출
);

const add2: SecondOrderFunc<number, number> = add3(1);
const add1: FirstOrderFunc<number, number> = add2(2);

console.log(
  //
  add1, // 2차 함수, 부분함수
  add(1), // 2차 함수, 부분함수
);

console.log(
  //
  add1(5), // 2차 함수
  add(1)(5), // 2차 함수
);

console.log(
  //
  add1(3),
  add2(2)(3),
  add3(1)(2)(3),
);
