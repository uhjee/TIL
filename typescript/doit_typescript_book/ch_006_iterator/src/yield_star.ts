function* gen12() {
  yield 1;
  yield 2;
}

// yield* 키워드: 다른 generator나 배열을 대상으로 동작
export function* gen12345() {
  yield* gen12(); // yield* 피연산자: other generator
  yield* [3, 4]; // yield* 피연산자: 배열
  yield 5;
}

// for (let value of gen12345()) {
//   console.log(value);
// }

// yield 반환값: iteraotr의 next 메소드 호출 때, 매개변수에 전달하는 값

export function* gen() {
  let count = 5;
  let select = 0;
  while (count--) {
    select = yield `you select ${select}`; // iterator.next()의 매개변수를 반환. 다음 차례의 select 값 세팅
  }
}

export const random = (max, min = 0) => Math.round(Math.random() * (max - min)) + min;

const iter = gen();
while (true) {
  const { value, done } = iter.next(random(10, 1)); // next의 매개변수로 전달
  if (done) break;
  console.log(value);
}
