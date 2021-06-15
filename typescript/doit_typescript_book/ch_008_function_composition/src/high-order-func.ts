import { FirstOrderFunc, SecondOrderFunc, ThirdOrderFunc } from './func-signature';

// 1차 함수
export const inc: FirstOrderFunc<number, number> = (x: number): number => x + 1;

// 2차 고차 함수
export const add: SecondOrderFunc<number, number> =
  (x: number): FirstOrderFunc<number, number> =>
  (y: number): number =>
    x + y;

// 3차 고차 함수
export const add3: ThirdOrderFunc<number, number> =
  (x: number): SecondOrderFunc<number, number> =>
  (y: number): FirstOrderFunc<number, number> =>
  (z: number): number =>
    x + y + z;
