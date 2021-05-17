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
