import * as R from 'ramda';

// 1부터 10까지 수에서 중간값인 6보다 작은 수는 1씩 감소시키고, 같거나 큰 수는 1씩 증가시키는

const input: number[] = R.range(1, 10 + 1);
const halfValue = input[input.length / 2];

const subtractOrAdd = R.pipe(
  R.map(
    R.ifElse(
      R.lte(halfValue), // x => half <= x
      R.inc,
      R.dec,
    ),
  ),
  R.tap((n) => console.log(n)),
);

const result = subtractOrAdd(input);
