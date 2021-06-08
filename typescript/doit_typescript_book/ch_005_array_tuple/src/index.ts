const arr1 = [1, 2, 3];
console.log(typeof arr1);
console.log(Array.isArray(arr1));

let numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
let strArr: string[] = ['hello', 'hi'];

type IPerson = { name: string; age?: number };
let personArr: IPerson[] = [{ name: 'jee' }, { name: 'jack', age: 20 }];

console.log(typeof numArr);
console.log(personArr);

// split
const str: string = 'happy';
const strArr1: string[] = str.split('');
console.log(strArr1);

export const split = (str: string, delim: string = ''): string[] => str.split(delim);
console.log(split(str, ''));

// join
export const join = (arr: string[], delim: string): string => arr.join(delim);
console.log(join(strArr1, ''));

for (let index = 0; index < numArr.length; index++) {
  const item: number = numArr[index];
  console.log(item);
}

for (const item of numArr) {
  console.log(`${item}!`);
}

// generic
// T가 type variable이란 걸 알려줘야 한다. 파라미터 앞에 <T> 붙여야 함
export const arrLength = <T>(arr: T[]): number => arr.length;
export const isEmpty = <T>(arr: T[]): boolean => arrLength<T>(arr) === 0;

console.log(arrLength(numArr));
console.log(arrLength(strArr));

console.log(isEmpty(numArr));
console.log(isEmpty(strArr));
console.log(isEmpty([]));

// const identity = <T>(n: T): T => n;
// console.log(identity<boolean>(true), identity(true));

// const f = <T>(cb: (arg: T, i?: number) => number): void => {};

// Generic, Ts handbook 예제 코드
const identity = <T>(arg: T): T => arg;

// 사용자가 원하는 타입 매개변수명 사용 가능
const myIdentity: <U>(arg: U) => U = identity;

// ? 객체 리터럴 타입의 함수 호출 시그니처로 사용 가능
let myIdentity2: { <T>(arg: T): T } = identity;

console.log(myIdentity2(4));

// 제네릭 인터페이스
interface GenericIdentityFn {
  // 인자와 반환값의 타입이 같은 함수
  <T>(arg: T): T;
}

const identity3 = <T>(arg: T): T => arg;

const myIdentity3: GenericIdentityFn = identity3;

console.log(myIdentity3('hi'));

// let numbers: number[] = range(1, 9 + 1);
// console.log(numbers);

// ! 선언적 프로그래밍

// 명령형
let sum = 0;
for (let i = 0; i < 100; i++) {
  sum += i + 1;
}
console.log(sum);

// ? 선언형
// ? range 함수 구현
// - 재귀함수 방식으로 동작
// - from 에서 to 까지의 구성된 배열 생성
export const range = (from: number, to: number): number[] => (from < to ? [from, ...range(from + 1, to)] : []);

// ? fold: 접기
//    - T[] 배열 데이터를 가공해 하나의 T 타입 값으로 생성  cf. reduce..??
export const fold = <T>(array: T[], callback: (result: T, val: T) => T, initValue: T) => {
  let result: T = initValue;

  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    result = callback(result, value);
  }
  return result;
};
// 1~ 100 더하기

// 입력 데이터 생성
let numbers: number[] = range(1, 100 + 1);

// 입력 데이터 가공
let result = fold(numbers, (result, val) => result + val, 0);
console.log('1 ~ 100 sum', result);

// 1~100 까지의 홀수의 합 구하기
// ? filter
export const filter = <T>(array: T[], callback: (value: T, index?: number) => boolean): T[] => {
  let result: T[] = [];
  for (let index: number = 0; index < array.length; ++index) {
    const value = array[index];
    if (callback(value, index)) result = [...result, value];
  }
  return result;
};

let numbers1: number[] = range(1, 100 + 1);
// filter 함수의 콜백으로 predicate helper function 으로 사용되는 함수
const isOdd = (n: number): boolean => n % 2 !== 0;

let oddResult = fold(filter(numbers1, isOdd), (result, val) => result + val, 0);
console.log(oddResult);

// 1 ~ 100 짝수
const isEven = (n: number): boolean => n % 2 === 0;
let evenResult = fold(filter(numbers1, isEven), (result, val) => result + val, 0);
console.log(evenResult);

// 제곱 더하기
// ? map
export const map = <T, Q>(array: T[], callback: (value: T, index?: number) => Q): Q[] => {
  let result: Q[] = [];
  for (let index = 0; index < array.length; ++index) {
    const value = array[index];
    result = [...result, callback(value, index)];
  }
  return result;
};

// 1^2 + ... 100^2 더한 값 구하기
let numbers2 = range(1, 100 + 1);

let squaredResult = fold(
  map(numbers2, (val) => val * val),
  (result, val) => result + val,
  0,
);
console.log(squaredResult);

//? 순수함수와 readonly
const addLength: (a: readonly number[], b: number[]) => number = (a: readonly number[], b: number[]): number => {
  return a.length + b.length;
};

let arr5 = [1, 2, 3, 4, 5];
let arr6 = [1, 2, 3];

console.log(addLength(arr5, arr6));

// sort 함수 - 순수함수로 구현
// - 원본 데이터에 대한 변형 X
export const pureSort = <T>(arr: readonly T[]): T[] => {
  let deepCopied = [...arr]; // spread syntax를 통한 깊은 복사
  return deepCopied.sort();
};

let arr7 = [7, 9, 1, 2, 6, 2, 7, 5, 8];

const arr8 = pureSort(arr7);
console.log(arr8);

// 가변 인수 함수 - mergeArray
// parameter rest syntax
export const mergeArray = <T>(...arrs: readonly T[][]): T[] => {
  let result: T[] = [];
  for (let i = 0; i < arrs.length; i++) {
    const array: T[] = arrs[i];

    result = [...result, ...array]; // spread syntax
  }
  return result;
};

/**
 * tuple
 *
 */
let tuple: any[] = [true, 'string', 4];
// any[] 형태는 타입스크립트의 타입 기능을 무력화 시킴

let realTuple: [boolean, string, number] = [true, 'string', 4];

// 별칭 사용
// try/catch/finnaly의 예외 처리 구문에서 사용하고자..
// 또 아래와 같은 예외처리는 불순 함수를 순수함수로 바꿔주는 전형적인 코드 설계 방식이라고 한다...
export type ResultType = [boolean, string];

// import { ResultType } from '.';

export const doSomething = (): ResultType => {
  try {
    throw new Error('some error occurs...');
  } catch (e) {
    return [false, e.message];
  }
};

// 튜플도 물리적으로는 배열, 인덱스 연산자 또는 비구조화 할당문을 적용할 수 있다.
// import {doSomething} from ''

const [result1, errorMessage] = doSomething();
