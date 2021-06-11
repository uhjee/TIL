import { pull, pullAll } from 'lodash'

const numArr: number[] = [1, 2, 3, 3, 3, 4, 4, 5, 5, 5]

console.log(pull(numArr, 5))
console.log(numArr) // 원본 배열 변경

// console.log(pullAll(numArr, [1, 2]))
