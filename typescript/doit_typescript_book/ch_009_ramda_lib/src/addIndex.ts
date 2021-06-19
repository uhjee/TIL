import * as R from 'ramda';

// 두 번째 매개변수로 index 제공
const indexedMap = R.addIndex(R.map);

const result = indexedMap(
  //
  (v: number, i: number) => R.add(v, i),
)(R.range(1, 5));

console.log(result);

// const addIndex = R.pipe(
//   //
//   R.addIndex(R.map)(R.add),
//   // R.addIndex(R.map)((value: number, index: number) => R.add(value)(index)),
//   R.tap((a) => console.log(a)),
// );
