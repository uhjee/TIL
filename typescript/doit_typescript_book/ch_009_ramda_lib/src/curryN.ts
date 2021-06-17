import { curryN } from 'ramda'

export const sum = (...numbers: number[]): number =>
  //
  numbers.reduce((result: number, sum: number) => result + sum, 0) //

console.log(sum(1, 2, 3, 4))

const currySum: Function = curryN(4, sum)

console.log(currySum(1)(2)(3)(4))
