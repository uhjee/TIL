import { range, tap } from 'ramda'

console.log(range(1, 9 + 1))

// ! range
const numbers: number[] = range(1, 5 + 1)

// ! tap - debugging 용
tap((n) => console.log(n))(numbers)
