import * as R from 'ramda'

console.log(
  //
  R.add(1, 2),  // 3 - 일반함수
  R.add(1)(2),  // 3 - 고차함수
)
