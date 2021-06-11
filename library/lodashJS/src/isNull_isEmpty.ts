import { isNil, isEmpty } from 'lodash'

// ! isNil
console.log(isNil({})) // false

// ! isEmpty
console.log(isEmpty({})) // true
console.log(isEmpty([])) // true

console.log(isEmpty(0)) // true
console.log(isEmpty(9)) // true
console.log(isEmpty(true)) // true
console.log(isEmpty(null)) // true
console.log(isEmpty(undefined)) // true

// string 관련
console.log(isEmpty('')) // true
console.log(isEmpty('happy')) // false *** 주의

console.log(isEmpty({ name: '' })) // false
console.log(isEmpty([1, 2, 3])) // false
