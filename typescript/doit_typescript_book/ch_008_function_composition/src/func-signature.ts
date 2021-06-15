export type FirstOrderFunc<T, R> = (a: T) => R; // 1차 함수
export type SecondOrderFunc<T, R> = (b: T) => FirstOrderFunc<T, R>; // 2차 고차 함수
export type ThirdOrderFunc<T, R> = (c: T) => SecondOrderFunc<T, R>; // 3차 고차 함수
