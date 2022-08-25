import { sum, range, promiseTest } from '../src/index';

describe('각종 함수를 테스트합니다.', () => {
  describe('sum()', () => {
    it('number 파라미터를 전달하면, number 타입을 반환해야 함 ', () => {
      // toBe() : primitive type을 비교할 때 사용
      expect(sum(1, 2)).toBe(3);
    });
  });

  describe('range()', () => {
    it('param1이 param2 보다 작은 숫자로 입력하면, 정상적으로 동작해야 함', () => {
      // toStrictEqual() : 같은 타입, 같은 구조의 object를 비교할 때 사용
      expect(range(1, 5 + 1)).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('param1이 param2보다 큰 경우, 빈 배열을 반환해야 함', () => {
      expect(range(10, 1)).toStrictEqual([]);
    });
  });

  describe('promiseTest(), Promise 테스트', () => {
    it('파라미터로 null을 보내면 reject 상태가 되고, \'fail\'을 반환해야 함', async () => {
      expect(promiseTest(null)).rejects.toMatch('fail');
    });

    it('파라미터로 string을 보내면 string을 반환해야 함', async () => {
      expect(promiseTest('happy')).resolves.toBe('happy');
    });
  });
});
