# 09. 정적 타입 그리고 타입스크립트

- javascript: 동적 타입 언어 - **변수 타입은 runtime에 결정됨**

## 9.1 타입스크립트

javascript 에 정적 타입을 추가해주는 언어 또는 도구 

- Elm
- ReasonML
- PureScript
- Flow

### 9.1.1 동적 타입 언어와 정적 타입 언어

| 동적 타입 언어                                               | 정적 타입 언어                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - 타입에 대한 고민없이 배우기 쉬움<br />- 코드의 양이 적을 때 생산성이 높음<br />- 타입에 오류가 **runtime** 시 발생 | - 변수 선언할 때마다 타입을 고민해야함<br />- 코드의 양이 많을 때 동적 언어보다 생산성이 높음<br />- 타입 오류가 **compile** 시 발견 |

#### 정적 타입 언어가 생산성이 높은 이유

- Type으로 서로 연결되어 있기 때문에, 연관 코드를 찾기 쉽고, 변수명, 함수명 변경하는 등의 리팩토링 용이
- import 하지 않고 코드를 작성해도, IDE가 필요한 코드를 자동으로 넣어줄 수 있음
- 함수 호출 시, 미리 매개변수의 종류 와 리턴값을 알 수 있음
- 객체의 property의 속성을 미리 지정해둘 수 있음

### 9.1.2 타입스크립트의 장점

- js의 새로운 표준이 빠르게 반영
- 리액트 개발자 의견 반영
- 큰 생태계

### 9.1.3 실습 준비

#### 타입 선언

```typescript
// 변수 생성 및 할당 시
let v1: number | string = 123;
v1 = 'abc';
```

## 9.2 타입스크립트의 여러 가지 타입

- primitive type은 **소문자**로 적는다.

```typescript
// Primitive type
const size: number = 123;
const isBig: boolean = size >= 100;
const msg: string = isBig ? '크다' : '작다';

// Array
const values: number[] = [1, 2, 3];
const values: Array<number> = [1, 2, 3];
values.push('a'); // type error!

const data: [string, number] = ['messgae', 10];
data[0].substr(1);
data[1].substr(1); // type error!

```

#### null, undefined Type

javascript에서는 값으로 존재하는 `null`과 `undefined`는 typescript에서 각각 타입으로 존재

```typescript
let v1: undefined = undefined;
let v2: null = null;
v1 = 123; // type error!

let v3: number | undefined = undefined;
v3 = 123;
```

####  문자열 리터럴과 숫자 리터럴 타입

```typescript
let v1: 10 | 20 | 30;
v1 = 10;
v1 = 15; // type error

let v2: '경찰관' | '소방관';
v2 = '의사'  // type error
```

#### any 타입

모든 종류의 값을 허용하는 타입

```typescript
let value: any;
value = 123;
value = '456';
value = () => {};
```

- 숫자, 문자열 뿐 아니라 함수도 가능
- 기존 javascript 프로젝트를 typescript로 포팅하는 경우 유용하게 사용 가능
- 단, any 타입을 남발하면 typescript를 사용하는 의미가 퇴색

#### void와 never

- void : 아무 값도 반환하지 않고 종료되는 함수의 리턴값 타입은 void 타입으로 정의
- never : 항상 예외가 발생해서 비정상적으로 종료되거나 무한 루프 때문에 종료되지 않는 함수의 반환 타입은 never 타입으로 정의

```typescript
function f1(): void {
  console.log('hello');
}

function f2(): never {
  throw new Error('some error');
}

function f3(): never {
  while(true) {
    console.log('what');
  }
}
```

#### object 타입

```typescript
let v: object;
v = { name: 'abc' };
console.log(v.prop1); // type error
```

####  교차 타입과 유니온 타입

- 교차 타입: 여러 타입의 교집합 `&`
- 유니온 타입: 여러 타입의 합집합 `|`

```typescript
let v1: (1 | 3 | 5) & (3 | 5 | 7);
v1 = 3;
v1 = 1; // type error
```

#### type 키워드로 타입에 alias 별칭 사용

```typescript
type Width = number | string;

let width: Width;
width = 100;
width = '100px';
```

### 9.2.2 열거형 타입

- 열거형 타입은 `enum` 키워드를 사용해서 정의

```typescript
enum Fruit {
  Apple,
  Banana,
  Orange,
}

const v1: Fruit = Fruit.Apple;
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana;
```

- 열거형 타입의 첫 번째 원소에 값을 할당하지 않으면 자동으로 0이 할당
- 각 원소에 숫자 또는 문자열을 할당할 수 있음. 명시적으로 값을 입력하지 않으면, 이전 원소에서 1만큼 증가한 값 할당

```typescript
enum Fruit {
  Apple,
  Banana = 5,
  Orange,
}
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange); // 0, 5, 6
console.log(Fruit[5]); // Banana
```

- 열거형 타입은 객체이기 때문에 일반적인 객체처럼 다룰 수 있음
- key와 숫자로 **양방향** 바인딩

#### 열거형 타입의 값으로 문자열 할당하기

```typescript
enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}
```

- 열거형 타입의 원소에 문자열을 할당하는 경우에는 **단방향**으로 매핑

#### 열거형 타입을 위한 유틸리티 함수

열거형 타입을 자주 사용할 때에는 유틸리티 함수를 만들어서 사용하는 게 편리

- 열거형 타입의 원소 개수를 알려주는 함수

  ```typescript
  function getEnumLength(enumObject: any) {
    const keys = Object.keys(enumObject);
    // enum의 값이 숫자이면 두 개씩 들어가므로 문자열만 계산한다.
    return keys.reduce(
    	(acc, key) => (typeof enumObject[key] === 'string' ? acc + 1 : acc ),
    )
  }

- 열거형 타입에 존재하는 값인지 검사하는 함수

  - 서버로부터 받은 데이터를 검증할 때 유용하게 사용 가능

  ```typescript
  function isValidEnumValue(enumObject: any, value: number | string) {
    if(typeof value === 'number') {
      return !!enumObject[value];
    } else {
      return (
      	Object.keys(enumObject)
        	.filter(key => isNaN(Number(key)))
        	.some(key => enumObject[key] === value)
      );
    }
  }
  ```

- getEnumLength, isValidEnumValue 를 사용하는 함수

  ```typescript
  enum Fruit {
  	Apple,
    Banana,
    Orange,
  }
  
  enum Language {
    Korean = 'ko',
   	English = 'en',
    Japanese = 'jp',
  }
  
  console.log(getEnumLength(Fruit), getEnumLength(Language)); // 3, 3
  console.log('1 in Fruit:', isValidEnumValue(Fruit, 1)); // true
  console.log('5 in Fruit:', isValidEnumValue(Fruit, 5)); // false
  console.log('ko in Language: ', isValidEnumValue(Language, 'ko')); // true
  console.log('Korean in Language: ', isValidEnumValue(Language, 'Korean')); // false
  ```

#### 상수 열거형 타입

- 열거형 타입은 컴파일 후에도 남아있기 때문에, 번들 파일 크기를 불필요하게 키울 수 있다.
- **상수(const)** 열거형 타입을 사용하면 컴파일 결과에 열거형 타입의 객체를 남겨 놓지 않을 수 있음

```typescript
const enum Fruit {
  Apple,
  Banana,
  Orange,
}
const fruit: Fruit = Fruit.Apple;

const enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}

const lang: Language = Language.Korean;
```

- 상수 열거형 타입을 사용하는 경우, 열거형 타입의 객체를 사용할 수 없음

```typescript
const enum Fruit {
	Apple,
  Banana,
  Orange,
}

console.log(getEnumLength(Fruit)); // type error
```

### 9.2.3 함수 타입

- 매개변수, 반환값의 타입을 지정해주어야 한다.

  ```typescript
  function getInfoText(next: string, age: number): string {
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
  }
  
  const v1: string = getInfoText('mike', 23);
  const v2: string = getInfoText('mike', '23'); // parameter type error!
  const v3: number = getInfoText('mike', 23);  // return type error!
  ```

  

#### 변수를 함수 타입으로 정의하기

```typescript
const getInfoText: (name: string, age: number) => string = function(name, age) {
  // ...
};
```

#### 선택 매개변수

```typescript
// 세 번째 매개변수 language는 optional
function getInfoText(name: string, age: number, language?: string): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  const languageText = language ? language.substr(0, 10) : '';
}

getInfoText('mike', 23, 'ko');
getInfoText('mike', 23);
getInfoText('mike', 23, 123); // 타입 에러
```

- 중간 매개변수에 optional 사용하기 => `undefined` 사용

  ```typescript
  function getInfoText(
  	name: string,
   	language: string | undefined,  // undefined 유니온 타입으로 묶기
    age: number,
  ): string {
      // ...
    }
  ```

#### 매개변수의 기본값 정의하기

```typescript
function getInfoText(
	name: string,
   age: number = 15,
   language = 'korean', // 타입 추론 -> string
): string {
    // ...
  }

console.log(getInfoText('mike')); // 정상
console.log(getInfoText('mike', 23)); // 정상
console.log(getInfoText('mike', 35, 'english')); // 정상

const f1: (
	name: string,
  age?: number,	// 기본값이 있는 매개변수는 optional!
  language?: string, // 기본값이 있는 매개변수는 optional!
) => string = getInfoText;
```

#### 나머지 매개변수

```typescript
function getInfoText(name: string, ...rest: string[]): string {
  // ...
}
```

#### 함수의 this 타입

```typescript
function getParam(this: string, index: number): string {
  const params = this.splt(',') // 오타로 인한 타입 에러
}
```

#### primitive type 에 메소드 추가하기 : interface 사용

```typescript
interface String {
  getParam(this: string, index: number): string;
}

String.prototype.getParam= getParam; // prototype으로 등록
console.log('asdf, 1234, ok'.getParam(1)); // 'asdf'
```

#### 함수 오버로드: 여러 개의 타입 정의하기

`add` 라는 함수로 다음과 같은 일 처리하고자 할 때

- 두 매개변수가 모두 string이면 string 반환
- 두 매개변수가 모두 숫자면 숫자 반환
- 두 매개변수를 서로 다른 타입으로 입력하면 X

함수 오버로드 사용하지 않고 구현

``` typescript
function add(x: number | string, y: number | string): number | string {
  if(typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else {
    const result = Number(x) + Number(y);
    return result.toString();
  }
}

const v1: number = add(1, 2); // type error!
console.log(add(1, '2')) // type error 발생 X -> 문제 발생
```

함수 오버로드 사용하고 구현

```typescript
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
  // ...
}

const v1: number = add(1, 2); 
console.log(add(1, '2')); 타입 에러 발생
```

#### 명명된 매개변수

```typescript
function getInfoText({
  name,
  age = 15,
  language,
}): {
  name: string;
  age?: number;
  language?: string;
}) : strring {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
```

명명된 매개변수의 타입을 다른 코드에서도 재사용 -> interface 사용

```typescript
interface Param {
  name: string;
  age?: number;
  language?: string;
}

function getInfoText({ name, age = 15, language }: Param): string {
  // ...
}
```

## 9.3 인터페이스

- java에서 보다 다양한 것들을 정의하는 데 사용됨

### 9.3.1 인터페이스로 객체 타입 정의하기

```typescript
// interface 정의
interface Person {
    name: string;
    age: number;
}

const p1: Person = { name: 'nike', age: 23 };
const p2: Person = { name: 'nike', age: 'twenty' }; // type error
```

#### 선택 속성 (optional property)

- 객체에 없어도 되는 속성

```typescript
interface Person {
    name: string;
    age?: number;
}

const p1: Person = { name: 'mike' };
```

#### 읽기 전용 속성

- 객체에서 읽기 전용 속성은 값이 변하지 않는 속성을 뜻함
- **readonly** 키워드 사용

``` typescript
interface Person {
    readonly name: string;
    age?: number;
}

const p1: Person = {
    name: 'mike',  // 변수를 정의하는 시점에는 값 할당 가능
};

p1.name = 'john'; // compile error
```

#### 정의되지 않은 속성값에 대한 처리

- 보통은 객체가 interface에 정의되지 않은 property를 갖고 있어도 할당 가능
- 단 객체 리터럴로 값을 초기화하는 경우에는 interface에 정의되지 않은 property가 있으면 타입 에러 발생

```typescript
interface Person {
    readonly name: string;
    age?: number
}
```

```typescript
const p1: Person = {
    name: 'mike',
    birthday: '1992-03-02', // type error
}

const p2 = {
    name: 'john',
    birthday: '1992-03-02', 
}

const p3: Person = p2; // error 발생 X
```

### 9.3.2 인터페이스로 정의하는 인덱스 타입

- interface에서 속성 이름을 구체적으로 정의하지 않고, 값의 type 만 정의하는 것을 **index 타입**이라고 칭함

```typescript
interface Person {
    readonly name: string;
    age: number;
    [key: string]: string | number; // index 타입
}
```

```typescript
const p1: Person = {
    name: 'mike',
    birthday: '1992-12-11', // type error 발생 X
    age: 25,
}
```

#### 여러 개의 인덱스를 정의하는 경우

- javascript 에서는 객체의 속성 이름에 숫자 또는 문자열을 사용할 수 있다.

```typescript
interface YearPriceMap {
    [year: number]: number;
    [year: string]: string | number;
}
```

```typescript
const yearMap: YearPriceMap = {};

yearMap[1988] = 1000;
yaerMap[1994] = 'abc'; // type error
yearMap['2000'] = 123;
yearMap['2000'] = 'million';
```

### 9.3.3 그 밖에 인터페이스로 할 수 있는 것

#### 인터페이스로 함수 타입 정의하기

```typescript
// 정의
interface GetInfoText {
  (name: string, age: number): string;
}

// 생성
const getInfoText: GetInfoText = function(name, age) {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}`;
}
```

####  인터페이스로 클래스 구현하기

```typescript
interface Person {
  name: string;
  age: number;
  isYoungerThan(age: number): boolean;
}

// class implement
class SomePerson implements Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  isYoungerThan(age: number) {
    return this.age < age;
  }
}

```

#### 인터페이스 확장하기

- java와 달리 다중 확장이 가능하다.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Programmer {
  favoriteProgrammingLanguage: string;
}

// interface extend (multiple)
interface Korean extends Person, Programmer {
  isLiveInSeoul: boolean;
}

```

#### 인터페이스 합치기

- 교차 타입을 사용해 여러 인터페이스를 하나로 합칠 수 있다.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Product {
  name: string;
  price: number;
}

// 교차 타입 선언
type PP = Person & Product;

const pp: PP = {
  name: 'a',
  age: 23,
  price: 1000,
}
```

---

## 9.4 타입 호환성

- 어떤 타입을 다른 타입으로 취급해도 되는지 판단하는 것
- 정적 타입 언어의 중요한 역할: **컴파일 타임**에 호환되지 않는 타입을 찾아내는 것

### 9.4.1 숫자와 문자열의 타입 호환성

- 서로 할당이 가능하지 않다

```typescript
function fun1(a: number, b: number | string) {
  const v1: number | string = a;
  const v2: number = b; // type error!
}

function func2(a: 1 | 2) {
  const v1: 1 | 3 = a; // type error!
  const v2: 1 | 2 | 3 = a;
}
```

### 9.4.2 인터페이스 타입 호환성

#### **덕 타이핑 | 구조적 타이핑**

- typescript 는 값 자체의 타입보다는 값이 가진 내부 구조에 기반해서 타입 호환성 검사
- interface A 가 interface B로 할당 가능한 조건
  1. B에 있는 모든 필수 속성의 이름이 A에도 존재해야 함
  2. 같은 속성 이름에 대해, A의 속성이 B의 속성에 할당 가능해야 한다.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Product {
  name: string;
  age: number
}

const person: Person = { name: 'mike', age: 23 };
const product: Product = person; // 같은 내부 구조를 가졌기 때문에 서로 할당 가능
```

#### 선택 속성이 타입 호환성에 미치는 영향

- **선택 옵션**을 가진 `Person` 값의 집합은 `Product` 값의 집합보다 커진다.

```typescript
interface Person {
  name: string;
  age?: number; // optional
}

interface Product {
  name: string;
  age: number
}

const person: Person = { name: 'mike' };
const product: Product = person; // type error!
																	// Person 이 Product보다 크기 때문
```

```typescript
interface Person {
  name: string;
  age?: number; // optional
}

interface Product {
  name: string;
  age: number
}

const product: Product = { name: 'computer', age: 2 };
const person: Person = product; // 할당 가능 (위와 반대로 할당)
																	// Person 이 Product보다 크기 때문
```

#### 추가 속성과 유니온 타입이 타입 호환성에 미치는 영향

- **추가 속성**이 있으면 값의 집합은 더 작아진다.
- **유니온 타입**이 있으면 값의 집합은 더 커진다.

```typescript
interface Person {
  name: string;
  age: number;
  gender: string; // 추가 속성
}

interface Product {
  name: string;
  age: number | string; // union type
}

// Person이 Product 보다 집합이 작기 때문에 아래와 같이 할당 가능
const person: Person = { name: 'jee', age: 3, gender: 'male' };
const product: Product = person;
```

### 9.4.3 함수의 타입 호환성

- 함수는 호출하는 시점에 문제가 없어야 할당 가능
- 함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건  `b: B = a: A`
  1. A의 매개변수 개수가 B의 매개변수 개수보다 적어야 한다.
  2. 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당이 가능해야 한다.
  3. A의 반환값은 B의 반환값으로 할당 가능해야 한다.

```typescript
type F1 = (a: number, b: string) => number;
type F2 = (a: number) => number;
type F3 = (a: number) => number | string;

let f1: F1 = (a, b) => 1;
let f2: F2 = a => 1;
let f3: F3 = a => 1;

f1 = f2;
f2 = f1;  // type error - 조건 1 걸림
f2 = f3; 	// type error - 조건 3 걸림
```

#### 배열의 map 메소드를 통해 살펴보는 함수의 타입 호환성

```typescript
function addOne(value: number) {
  return value + 1;
}

const result = [1, 2, 3].map<number>(addOne); // generic은 매개변수 함수(addOne)의 반환 타입 의미
```

```typescript
// map()이 입력받는 함수의 타입
(value: number, index: number, array: number[]) => number
```

- 즉 addOne 함수가 map이 입력받는 함수에 할당
  - 함수의 매개변수 개수 - 적음
  - 같은 위치의 매개변수에 할당되어야 함 - 할당 가능
  - 반환값 - 할당 가능

---

## 9.5 타입스크립트 고급 기능

타입을 정의하는 데 사용되는 고급 기능들

- 제네릭
- 맵드 타입
- 조건부 타입

### 9.5.1 제네릭

: 타입 정보가 동적으로 결정되는 타입

- 제네릭을 통해 같은 규칙을 여러 타입에 적용 가능 => 타입 코드 작성 시 중복 코드 제거 가능

```typescript
// 배열의 크기와 초깃값을 입력받아 배열을 생성하는 함수

// 1. number Array
function makeNumberArray(defaultValue: number, size: number): number[] {
  const arr: number[] = [];
  for(let i=0; i< size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

// 2. string array
function makeStringArray(defaultValue: string, size: number): sting[] {
  const arr: string[] = [];
  for(let i=0; i< size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

const arr1 = makeNumberArray(1, 10);
const arr2 = makeStringArray('empty', 10);
```

- 위의 코드는 중복코드가 많음

#### 함수 오버로드로 개선

```typescript
// 함수 타입 정의
function makeArray(default: number, size: number): number[];
function makeArray(default: string, size: number): string[];
```

- 개선되었긴 하지만 타입을 추가할 때마다 코드도 추가해야 함
- 타입의 종류가 많아지면 가독성이 떨어짐

#### 제네릭으로 문제 해결

```typescript
// generic function 생성: T는 호출시점에 결정됨
function makeArray<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = [];
  for(let i=0; i< size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

const arr1 = makeArray<number>(1, 10);
const arr2 = makeArray<string>('empty', 10);

const arr3 = makeArray(1, 10);
const arr4 = makeArray('empty', 10);
```

#### 제네릭으로 스택 구현하기

- generic은 데이터 타입의 다양성을 부여할 수 있기 때문에 자료구조에 많이 사용됨

```typescript
// Stack class 생성
class Stack<D> {
  private items: D[] = [];
  
  push(item: D) {
    this.items.push(item);
  }
  
  pop() {
    return this.items.pop();
  }
}

// stack 인스턴스 생성 및 메소드 호출
const numberStack = new Stack<number>();
numberStack.push(10);
const v1 = numberStack.pop(); // 10

const stringStack = new Stack<string>();
stringStack.push('a');
const v2 = stringStack.pop(); // 'a'

// 변수 선언
let myStack: Stack<number>;
myStack = numberStack;
myStack = stringStack; // type error!


```

#### extends 키워드로 제네릭 타입 제한하기

```typescript
function identity<T extends number | string>(p1: T): T {
  return p1;
}

identity(1);
identity('a');
identity([]); // type error
```

```typescript
interface Person {
  name: String;
  age: number;
}

// interface 확장
interface Korean extends Person {
  liveInSeoul: boolean;
}

function swapProperty<T extends Person, K extends keyof Person> (
		p1: T,
  	p2: T,
    name: K,
): void {
			const temp = p1[name];
      p1[name] = p2[name];
      p2[name] = temp;
}

const p1: Korean = {
  name: '홍길동',
  age: 23,
  liveInSeoul: true,
};

const p2: Korean = {
  name: '김삿갓',
  age: 31,
  liveInSeoul: false,
};

swapProperty(p1, p2, 'age');
```

- keyof 키워드: 인터페이스의 모든 속성 이름을 유니온 타입으로 만들어줌



### 9.5.2 맵드 타입

: 몇 가지 규칙으로 새로운 인터페이스를 만들 수 있다.

- 기존 인터페이스의 모든 속성을 선택 속성 또는 읽기 전용으로 만들 때 주로 사용

 ```typescript
 interface Person {
   name: string;
   age: number;
 }
 interface PersonOptional {
   name?: string;
   age?: number;
 }
 interface PersonReadOnly {
   readonly name: string;
   readonly age: number;
 }
 ```

두 개의 속성을 boolean 타입으로 만드는 mapped type

```typescript
type T1 = { [K in 'prop1' | 'prop2']:boolean };
// 위의 mapped type으로 만든 실제 결과: { prop1: boolean; prop2: boolean; }
```

- in 키워드 오른쪽에는 문자열의 유니온 타입이 올 수 있음

입력된 인터페이스의 모든 속성을 boolean 타입 및 선택 속성으로 만들어주는 mapped type

```typescript
type makeBoolean<T> = { [P in keyof T]?: boolean };

const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;
```

#### Record 내장 타입

: 타입스크립트 내장 타입인 `Record` 는 입력된 모든 속성을 같은 타입으로 만들어주는 mapped type

```typescript
type Record<K extends string, T> = { [P in K]: T };

type T1 = Record<'p1' | 'p2', Person>;
// 위의 결과:  type T1 = { p1: Person; p2: Person; };
```

#### 열거형 타입과 맵드 타입

- 맵드 타입을 사용하면 열거형 타입의 활용도를 높일 수 있음

```typescript
enum Fruit {
  Apple,
  Banana,
  Orange,
}

const FRIUT_PRICE = {
  [Friut.Apple]: 1200,
  [Friut.Banana]: 2000,
  [Friut.Orange]: 3000,
}
```

아래와 같이 맵드 타입 사용

- 모든 원소를 속성으로 가질 수 있도록 보장한다.

```typescript
enum Fruit {
  Apple,
  Banana,
  Orange,
}

const FRUIT_PRCIE: { [key in Fruit]: number } = { // type error 발생 : Orange 추가해야 함
  [Friut.Apple]: 1200,
  [Friut.Banana]: 2000,
}
```

### 9.5.3 조건부 타입

: 입력된 제네릭 타입에 따라 타입을 결정할 수 있는 기능

- `extends` 키워드와 `?` 기호를 사용해 정의 (삼항 연산자)

  ```typescript
  T extends U ? X: Y
  ```

```typescript
// 입력된 제네릭이 문자열인지 여부에 따라 타입 결정
type IsStringType<T> = T extends string ? 'yes' : 'no';
type T1 = IsStringType<string>; // 'yes'
type T2 = IsStringType<number>; // 'no'
```

조건부 타입에 유니온 타입을 사용하면 유용한 유틸리티 타입 생성 가능

```typescript
type T1 = IsStringType<string | number>; // 'yes' | 'no'
type T2 = IsStringType<string> | IsStringType<number>; // 'yes' | 'no'
```

#### Exclude, Extract 내장 타입

- Exclude : U의 sub타입 제거

```typescript
type T1 = number | string | never; 

// U의 sub타입을 제거하는 유틸리티 타입
type Exclude<T, U> = T extends U ? never : T; 

type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7
type T2 = Exclued<string | number | (() => void), Function>; // string | number
```

- Extract: U의 sub타입이 아닌 타입 제거

```typescript
// U의 sub타입이 아닌 타입을 제거하는 유틸리티 타입
type Extract<T, U> = T extends U ? T : never;
type T4 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5
```

