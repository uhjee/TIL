console.log('start!');

class Person {
  constructor(public name: string, public age?: number) {}
}

const person1 = new Person('jee', 30);

console.log(person1);

// 화살표 함수: 반환값 string
const introduceMe: (me: Person) => string = (me: Person): string => `이름은 ${me.name}, 나이는 ${me.age}`;

// 함수 선언식: 반환값 void
const printMe: (value: string) => void = function (str: string): void {
  console.log(str);
};

printMe(introduceMe(person1));

// 타입 alias
type numberFunc = (num1: number, num2: number) => number;

const add: numberFunc = (a: number, b: number) => a + b;

const multifi: numberFunc = (a: number, b: number) => a * b;

console.log(add(1, 2));
console.log(multifi(3, 4));

interface IAgeable {
  age?: number;
}

const getAge: (o: IAgeable) => number = (o: IAgeable): number => {
  return o !== undefined && o.age ? o.age : 0;
};

type OptionalArgFunc = (arg1: string, arg?: number) => void;

const getInfo: OptionalArgFunc = (name: string, age?: number) => {
  console.log(`${name}, ${age}`);
};

getInfo('lila', 40);
getInfo('lila');

// * high-order function: 반환값이 함수
const add1 =
  (a: number): ((b: number) => number) =>
  (b: number) =>
    a + b;

const add2 = add1(1);
console.log(add2); // [Function]
console.log(add2(3)); // 4
console.log(add2(10)); // 11

const result = add1(1)(2);
console.log(result); // 3

type NumberToNumberFunc = (arg: number) => number;

const add3 = (a: number): NumberToNumberFunc => {
  // NumberToNumberFunc 타입의 함수 반환하는 중첩함수
  const _add: NumberToNumberFunc = (b: number): number => {
    // number 타입 반환
    return a + b; // 클로저: 비공개변수 a를 갖는 환경
  };
  return _add;
};

const multiply = (a: number) => (b: number) => (c: number) => a * b * c;

const result1 = multiply(1)(2)(3);
console.log(result1);

// 매개변수 기본값
export type Person1 = { name: string; age: number };

export const makePerson = (name: string, age: number = 10): Person1 => ({ name, age });

console.log(makePerson('jeejeejee', 30));
console.log(makePerson('jeejeejee'));

// arguments 비구조화 할당문 사용
const printPerson = ({ name, age }: Person1): void => console.log(`name: ${name}, age: ${age}`);

printPerson({ name: 'ayoung', age: 19 });

// 색인 가능 타입 indexable type
export type KeyValueType = {
  [key: string]: string;
};

export const makeObject = (key: string, value: string): KeyValueType => ({ [key]: value });

console.log(makeObject('name', 'jeechan'));
console.log(makeObject('firstNmae', 'kim'));

// 클래스 메소드

export class B {
  constructor(public value: number = 1) {}
  method(): void {
    console.log(`value: ${this.value}`);
  }
}

const b = new B(5);
b.method();

// static method
export class C {
  constructor(public name: string) {}
  static whoRu(): string {
    return `I'm class C`;
  }
}

const c1 = new C('jee');
const c2 = new C('yeo');

console.log(c1);
console.log(c2);
console.log(C.whoRu());

// method chain
export class Calculator {
  constructor(public value: number = 0) {}
  add(value: number) {
    this.value += value;
    return this; // method chain을 위한 자기 자신 반환
  }
  multiply(value: number) {
    this.value *= value;
    return this;
  }
}

const cal: Calculator = new Calculator();
console.log(cal.add(3));
console.log(cal.multiply(2));
console.log(cal.add(4).multiply(10));

console.log(cal.value);
