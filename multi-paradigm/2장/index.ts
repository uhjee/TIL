/**
 * 제네릭 타입 T를 받아서 그대로 반환하는 항등 함수
 * @param arg 입력받은 제네릭 타입 T의 값
 * @returns 입력받은 arg와 동일한 값을 반환한다
 */
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity(1)); // 1
console.log(identity('a')); // a

console.log('--------------------------------');

/**
 * 제네릭 타입 T를 받아서 항등 함수를 반환하는 함수
 * @param arg 입력받은 제네릭 타입 T의 값
 * @returns 항등 함수를 반환한다
 */
function constant<T>(arg: T): () => T {
  return () => arg;
}

const f = constant(1);
console.log(f()); // 1
const getHello = constant('hello');
console.log(getHello() + getHello()); // hellohello

console.log('--------------------------------');
/**
 * typescript의 함수 오버로드
 *
 */
function double(a: number): number;
function double(a: string): string;
function double(a: number | string): number | string {
  if (typeof a === 'number') {
    // type narrowing
    return a * 2;
  }
  return a + a;
}

console.log(double(1)); // 2
console.log(double('a')); // aa

console.log('--------------------------------');
