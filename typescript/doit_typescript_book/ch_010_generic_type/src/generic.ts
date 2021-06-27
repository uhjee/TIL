/**
 * generic이 사용될 수 있는 곳 4가지
 */

// 1. 인터페이스
export interface Ivaluable<T> {
  value: T;
}

// 2. 함수
export function identity<T>(arg: T): T {
  return arg;
}

// 3. 타입 별칭
export type valuableType<T> = {
  value: T;
};

// 4. 클래스 구문
export class Valuable<T> {
  constructor(public value: T) {}
}
