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

