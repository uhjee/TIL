import { range, pipe, tap } from 'ramda'

// ! 포인트가 없는 함수 : 2차 고차 함수로 1번만 인자가 입력된 상태? 부분함수?
// export const dump = pipe(
//   //
//   tap((n) => console.log(n)),
// )

// type assertion 타입 단언 사용
//  - 반환값의 타입을 any -> T[]  변경
export const dump = <T>(array: T[]): T[] =>
  pipe(
    //
    tap((n) => console.log(n)),
  )(array) as T[] // 반환값 자체가 T[] 로 명시(명시적 형변환 느낌)

// 마지막 파라미터 받음
dump(range(1, 100 + 1))
