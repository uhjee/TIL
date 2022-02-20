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

