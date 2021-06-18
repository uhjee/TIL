import { pipe, map, add } from 'ramda';

const originArray: number[] = [1, 2, 3];
const resultArray = pipe(
  //
  map(add(1)),
)(originArray);

console.log(originArray);
console.log(resultArray);
