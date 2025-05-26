# 3장. 코드:객체:함수 = Generator:Iterator:LISP = IP: OOP: FP

## 3.1 코드가 곧 데이터 - 로직이 담긴 리스트

### [for, i++, if, break] 코드를 리스트로 생각하기

- 명령형

  ```ts
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
  ```

- 코드를 리스트로 생각

  ```ts
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

  console.log(fnSumOfSquaresOfOddNums(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
  ```

  ```ts
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
  ```
