import { pick, omit } from 'lodash'

let obj = { a: 1, b: '2', c: 3 }

console.log(pick(obj, 'a', 'c'))

console.log(omit(obj, 'a'))
