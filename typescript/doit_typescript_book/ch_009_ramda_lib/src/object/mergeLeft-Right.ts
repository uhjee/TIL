import * as R from 'ramda';

const left = { name: 'obj1' };
const right = { name: 'obj2', age: 32 };
const person = R.mergeLeft(left)(right);
console.log(person); // { name: 'obj1', age: 32 }

const person1 = R.mergeRight(left)(right);
console.log(person1); // { name: 'obj2', age: 32 }
