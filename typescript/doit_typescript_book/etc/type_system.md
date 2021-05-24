# <a id="type_system">type system</a>



typescript의 타입 시스템

1. 타입을 **명시적**으로 지정할 수 있다.
2. 타입을 명시적으로 지정하지 않았을 경우, 타입스크립트 컴파일러가 자동으로 **타입을 추론**

- compile option
  - **`compilerOptions`**의 `noImplicitAny` 옵션
      - 타입을 명시적으로 지정하지 않은 경우,  타입스크립트 컴파일러가 추론하여 최상위 타입인 any로 판단하게 된다면, compile error를 발생시켜 명시적으로 타입을 지정하도록 유도
  - **`compilerOptions`**의 `strictNullChecks` 옵션
      - 모든 타입에 자동으로 (서브 타입으로) 포함되어 있는 'null'과 'undefined'를 제거

# structural type system - 같은 구조는 같은 타입

- 같은 구조라면, 서로의 식별자가 달라도 같은 타입으로 판단 e.g.typescript

```tsx
interface IPerson6 {
  name: string;
  age: number;
  speak(): string;
}

type PersonType = {
  name: string;
  age: number;
  speak(): string;
};

let personInterface: IPerson6 = {} as any;
let personType: PersonType = {} as any;

personInterface = personType; // 오류 발생 x
personType = personInterface; // 오류 발생 x
```

- 이와 반대되는 개념으로  nominal type system 존재
    - 구조가 같아도 이름이 다르면, 다른 타입
    - e.g. c, java ...
- duck typing
    - 다른 모양을 하고 있어도, 그 새가 오리처럼 걷고, 헤엄치고, 꽥꽥댄다면, 나는 그 새를 오리라고 부를 것이다.
    - e.g. python

# 서브 타입

- any는 모든 타입의 최상위 타입 - `noImplicitAny` 옵션
- null, undefined는 모든 타입의 최하위 타입 - `strictNullChecks` 옵션

```tsx
// ! sub type
let sub1: 1 = 1;
let sup1: number = sub1;
// sub1 = sup1; // 타입 에러 발생

let sub2: number[] = [1];
let sup2: object = sub2;
// sub2 = sup2; // 타입 에러 발생

let sub3: [number, number] = [1, 2];
let sup3: number[] = sub3;
// sub3 = sup3; // 타입 에러 발생

let sub4: string = 'lala';
let sup4: any = sub4;
sub4 = sup4;

let sub5: never = 0 as never;
let sup5: number = sub5;
// sub5 = sup5; // 타입 에러 발생

class Animal {}
class Dog extends Animal {
  eat() {}
}

let sub6: Dog = new Dog();
let sup6: Animal = sub6;
// sub6 = sup6;  // 타입 에러 발생
```

## 1. 우항의 type이 같거나 sub type 인 경우, 할당이 가능 ⇒ 공병

```tsx
// ! 01. 우항의 type이 같거나, subtype 인 경우, 할당 가능 => 공변
// case1) primitive type
let sub7: string = '';
let sup7: string | number = sub7; // union type

// case2) object - 각각 프로터피가 대응하는 프로퍼티와 같거나, sub type이어야 한다.
let sub8: { a: string; b: number } = { a: '', b: 1 };
let sup8: { a: string; b: number | string } = sub8;

// case3) array - object와 마찬가지
let sub9: Array<{ a: string; b: number }> = [
  { a: '', b: 1 },
  { a: 'jee', b: 10 },
];
let sup9: { a: string; b: number | string }[] = sub9;
```

## 2. 함수의 매개변수 타입만 같거나, super type인 경우, 할당이 가능 ⇒ 반병

```tsx
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
// 3. Whale => Whale 에다가 KilleWhale => Whle을 할당하는 경우 -> strictFunctionTypes 옵션이 true인 경우 에러
tellMe(function kToW(k: killerWhale): Whale {
  return new Whale();
});
```

- `strictFunctionTypes` : 함수를 할당할 시에 함수의 매개변수 타입이 같거나 슈퍼타입이 아니라면, 에러를 통해 경고
- 파라미터가 super type인 경우, sub type을 대신 받아줄 수 있기 때문인 듯 하다.

# Type Alias

- Interface 와 유사해 보인다.
- Primitive, Union Type, Tuple, Function
- 기타 직접 작성해야하는 타입을 다른 이름으로 지정할 수 있다.
- 이미 만들어진 타입의 refer로 사용하는 것 뿐이지, 타입 자체를 만드는 것은 아니다.

```tsx
// primitive type
type MyString = string;
let name: MyString = 'jee';
let yourName: string = 'michael';

name = yourName; // primitive인 경우, 큰 의미 없음

```

- **union type**일 경우, 짧게 사용할 수 있어 유용

    ```tsx
    // union type
    let person: string | number = 7;
    person = 'lalala';

    type StringOrNumber = string | number; // 타입

    let another: StringOrNumber = 4;
    another = 'rururu';
    ```

- tuple인 경우, 유용

    ```tsx
    // tuple
    let tuple: [string, number] = ['lala', 33];

    type StringNumberTuple = [string, number];  // 타입

    let anotherTuple: StringNumberTuple = ['', 4];
    ```

- function인 경우, 유용

    ```tsx
    // function
    type EatFuncType = (food: string) => string;  // 타입 
    
    type calcFuncType = (n: number) => number;  // 타입
    ```