import { range, rangeRight } from 'lodash'

for (let value of range(1, 10 + 1)) {
  console.log(value)
}

// 역순
for (let value of rangeRight(1, 10 + 1)) {
  console.log(value)
}
