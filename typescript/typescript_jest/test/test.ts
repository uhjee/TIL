import { sum, range } from '../src/index';

test('[sum] 1 + 2 to equal 3?', () => {
  // toBe() : primitive type을 비교할 때 사용
  expect(sum(1, 2)).toBe(3);
});

test('[range] from 1 to 5 equal [1,2,3,4,5]?', () => {
  // toStrictEqual() : 같은 타입, 같은 구조의 object를 비교할 때 사용
  expect(range(1, 5 + 1)).toStrictEqual([1, 2, 3, 4, 5]);
});
