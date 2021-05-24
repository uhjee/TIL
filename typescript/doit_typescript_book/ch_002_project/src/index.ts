import { testMakePerson } from './utils/makePerson';
// index.ts 네이밍 이유?
//    -> 엔트리 함수 (index.html 과 같음)
//    -> node 와 ts-node는 모두 ./src/index.ts 를 기본으로 바라보고 있다.

testMakePerson();

// ! 01. 우항의 type이 같거나, subtype 인 경우, 할당 가능 => 공변
// primitive type
let sub7: string = '';
let sup7: string | number = sub7; // union type

// object - 각각 프로터피가 대응하는 프로퍼티와 같거나, sub type이어야 한다.
let sub8: { a: string; b: number } = { a: '', b: 1 };
let sup8: { a: string; b: number | string } = sub8;

// array - object와 마찬가지
let sub9: Array<{ a: string; b: number }> = [
  { a: '', b: 1 },
  { a: 'jee', b: 10 },
];
let sup9: { a: string; b: number | string }[] = sub9;

// ! 02. 함수의 ( 매개변수의 타입이 같거나, supertype인 경우 ) 할당이 가능 => 반병
class Animal {}
class Whale extends Animal {
  swim() {
    console.log(`수영했어`);
  }
}
class killerWhale extends Whale {
  bite() {
    console.log(`물었어`);
  }
}

// parameter type : Whale
const tellMe = (fn: (whale: Whale) => Whale): void => {};

// 1. Whale => Whale 에다가 Whale => Whale 을 할당하는 경우
tellMe(function wToW(w: Whale): Whale {
  return new Whale();
});

// 2. Whale => Whale 에다가 Animal => Whale을 할당하는 경우
tellMe(function aToW(a: Animal): Whale {
  return new Whale();
});
// 3. Whale => Whale 에다가 KilleWhale => Whle을 할당하는 경우
tellMe(function kToW(k: killerWhale): Whale {
  return new Whale();
});

// ! type alias
// primitive type
type MyString = string;
let name: MyString = 'jee';
let yourName: string = 'michael';

name = yourName; // primitive인 경우, 큰 의미 없음

// union type
let person: string | number = 7;
person = 'lalala';

type StringOrNumber = string | number;

let another: StringOrNumber = 4;
another = 'rururu';

// tuple
let tuple: [string, number] = ['lala', 33];

type StringNumberTuple = [string, number];

let anotherTuple: StringNumberTuple = ['', 4];

// function
type EatFuncType = (food: string) => string;

type calcFuncType = (n: number) => number;
