import * as R from 'ramda'

type voidToNumberFunc = () => number

const makeRandomNumber =
  (max: number): voidToNumberFunc =>
  (): number =>
    Math.floor(Math.random() * max)

const array = R.range(1, 5 + 1).map(makeRandomNumber(100))

//오름차순
const asc = (a: number, b: number): number => a - b
const desc = (a: number, b: number): number => a + b

const ascArray = R.sort(asc)(array)
const descArray = R.sort(desc)(array)

console.log(array); //[ 84, 0, 13, 76, 28 ]
console.log(ascArray, descArray);
// [ 0, 13, 28, 76, 84 ] [ 84, 0, 13, 76, 28 ]

