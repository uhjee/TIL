import { Ivaluable } from './generic';

// 제네릭 인터페이스 구현한 클래스
export class Valuable<T> implements Ivaluable<T> {
  constructor(public value: T) {}
}

// 제네릭 인터페이스를 사용한 함수 선언
const printValue = <T>(o: Ivaluable<T>): void => console.log(o.value);

// 타입 명시
printValue(new Valuable<string>('happy')); // string
printValue(new Valuable<number>(3)); // number
printValue(new Valuable<boolean>(true)); // boolean
printValue(new Valuable<object>({ name: 'jee' })); // object
printValue(new Valuable<number[]>([1, 2, 3])); // object(array)

// 타입 추론
printValue(new Valuable('happy')); // string
printValue(new Valuable(3)); // number
printValue(new Valuable(true)); // boolean
printValue(new Valuable({ name: 'jee' })); // object
printValue(new Valuable([1, 2, 3])); // object(array)

//  ! 제네릭 타입 제약
const printValueT = <Q, T extends Ivaluable<Q>>(o: T) => console.log(o.value);

printValueT(new Valuable('lala'));
printValueT({ value: 'foo' });
