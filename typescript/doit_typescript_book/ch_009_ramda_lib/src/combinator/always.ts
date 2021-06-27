import * as R from 'ramda';

// ! always:  두 개의 고차 매개변수 중 첫 번째 것을 반환한다.
const always = x => y => x;

const flip = (cb: Function) => a => b => cb(b)(a);

const first =
  <T>(a: T) =>
  (b: T): T =>
    always(a)(b);

const second =
  <T>(a: T) =>
  (b: T): T =>
    flip(always)(a)(b);

console.log(
  //
  first(1)(2), // 1
  second(1)(2), // 2
);
