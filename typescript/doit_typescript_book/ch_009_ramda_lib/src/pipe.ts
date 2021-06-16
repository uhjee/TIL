import { range, pipe, tap } from 'ramda'

const array: number[] = range(1, 9 + 1)

// ! pipe 함수 사용
pipe(
  //
  tap((n) => console.log(n)),
)(array)
