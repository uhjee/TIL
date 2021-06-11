import { groupBy, flatten, uniqBy, uniq } from 'lodash'

// ! groupBy
// property
const gridList = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]

console.log(groupBy(gridList))
console.log(groupBy(gridList, 'x'))
console.log(groupBy(gridList, 'y'))

// function
const floatList = [1.2, 1.7, 3.7, 2.5, 3.2, 3.5, 2.8]

console.log(groupBy(floatList, Math.floor))

// ! flatten
const gridList2 = [
  [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
]

console.log(flatten(gridList2))
console.clear()
// ! uniqBy
const objList = [{ x: 1 }, { x: 1 }, { x: 2 }, { x: 2 }, { x: 2 }, { x: 3 }, { x: 3 }]

console.log(uniqBy(objList, 'x'))
