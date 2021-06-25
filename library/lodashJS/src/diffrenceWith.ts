import { differenceWith, isEqual } from 'lodash'

// * 배열과 두 번째 인자로 받는 배열을 비교해 같지 않는 요소들을 새로운 배열로 반환한다.
// * 각 array 요소에 comparator를 사용할 수 있다.
// * 주로 isEqual 과 함께 사용
// ? 애플망고에서는 테이블이 수정되었는지, 원본 테이블데이터와 현재 ui의 테이블데이터와 비교할 때 사용하는 듯

// 1 depth
const arr = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
]

const diffNewArr = differenceWith(arr, [{ x: 1, y: 2 }], isEqual)

console.log(diffNewArr) // [ { x: 2, y: 1 } ]


// 2 depth 도 되는 듯 하다.. 신기하네
const deepObjArr = [
  { name: 'foo', detail: { height: 190, weight: 200 } },
  { name: 'bar', detail: { height: 50, weight: 290 } },
]
const deepObjArr1 = [
  { name: 'foo', detail: { height: 190, weight: 200 } },
  { name: 'bar', detail: { height: 50, weight: 29 } },
]

const diffDeepObjArr = differenceWith(deepObjArr, deepObjArr1, isEqual )
console.log(diffDeepObjArr);

