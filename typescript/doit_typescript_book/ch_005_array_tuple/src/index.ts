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

// 1~ 100 더하기
// 명령형
let sum = 0;
for (let i = 0; i < 100; i++) {
  sum += i + 1;
}
console.log(sum);

// 선언형
// range 함수 구현
// - 재귀함수 방식으로 동작
// - from 에서 to 까지의 구성된 배열 생성
export const range = (from: number, to: number): number[] => (from < to ? [from, ...range(from + 1, to)] : []);

// fold: 접기
//    - T[] 배열 데이터를 가공해 하나의 T 타입 값으로 생성  cf. reduce..??
export const fold = <T>(array: T[], callback: (result: T, val: T) => T, initValue: T) => {
  let result: T = initValue;

  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    result = callback(result, value);
  }
  return result;
};

// 입력 데이터 생성
let numbers: number[] = range(1, 100 + 1);

// 입력 데이터 가공
let result = fold(numbers, (result, val) => result + val, 0);
console.log(result);
