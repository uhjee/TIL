import * as R from 'ramda'

const array: number[] = [3, 4]
const newArray = R.prepend(1)(array) // 가장 앞에 삽입
console.log(newArray);


const newArray1 = R.append(5)(array) // 가장 뒤에 삽입
console.log(newArray1);
