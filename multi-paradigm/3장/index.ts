import {
  every,
  filter,
  find,
  fx,
  map,
  reduce,
  some,
  take,
} from '../iterable_functions.js';

/**
 * [명령형] n개의 홀수를 제곱하여 모두 더하는 함수
 */
function sumOfSquaresOfOddNums(limit: number, list: number[]): number {
  let acc = 0;
  for (const a of list) {
    if (a % 2 === 1) {
      const b = a * a;
      acc += b;
      if (--limit === 0) {
        break;
      }
    }
  }
  return acc;
}

/**
 * [리스트 프로세싱] n개의 홀수를 제곱하여 모두 더하는 함수
 * @param limit 제한 값
 * @param list 리스트
 * @returns 결과 값
 */
const fnSumOfSquaresOfOddNums = (limit: number, list: number[]): number =>
  reduce(
    (acc, a) => acc + a,
    0,
    take(
      limit,
      map(
        (a) => a * a,
        filter((a) => a % 2 === 1, list),
      ),
    ),
  );

/**
 * [체이닝] n개의 홀수를 제곱하여 모두 더하는 함수
 * @param limit 제한 값
 * @param list 리스트
 * @returns 결과 값
 */
const chainSumOfSquaresOfOddNums = (limit: number, list: number[]): number =>
  fx(list)
    .filter((a) => a % 2 === 1)
    .map((a) => a * a)
    .take(limit)
    .reduce((acc, a) => acc + a, 0);

console.log(chainSumOfSquaresOfOddNums(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));

const found = find((a) => a % 2 === 1, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(found);

const isOdd = (v: number) => v % 2 === 1;

console.log(every(isOdd, [1, 3, 5]));
console.log(every(isOdd, [1, 2, 5]));
console.log(some(isOdd, [1, 3, 5]));
console.log(some(isOdd, [2, 4, 6]));

// 이 파일을 모듈로 만들어 전역 스코프 충돌을 방지
export {};
