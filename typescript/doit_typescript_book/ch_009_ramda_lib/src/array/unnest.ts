import * as R from 'ramda'

const array = R.range(1, 3 + 1).map((x: number) => {
  return R.range(1, 2 + 1).map((y: number) => {
    return [x, y]
  })
})

console.log(array)
// [  [ [ 1, 1 ], [ 1, 2 ] ],  [ [ 2, 1 ], [ 2, 2 ] ],  [ [ 3, 1 ], [ 3, 2 ] ]]
// 한번 
const unnestArray1 = R.unnest(array)
console.log(unnestArray1)
//[ [ 1, 1 ], [ 1, 2 ], [ 2, 1 ], [ 2, 2 ], [ 3, 1 ], [ 3, 2 ] ]

// 한번더 
const unnestArray2 = R.unnest(unnestArray1)
console.log(unnestArray2)
// [1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2]


