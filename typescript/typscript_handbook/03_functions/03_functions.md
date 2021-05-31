03_functions

함수 선언식, 함수 표현식 가능

- 함수 내부에서 외부의 변수를 참조할 때, 캡쳐('capture') 한다고 표현

## 함수의 타입

표기법

```typescript
( 파라미터: 타입[, ...] ) => 리턴 타입
```

예제

```typescript
type numberFunc = (a: number, b: number) => number

const add: numberFunc = (a: number, b: number) => a + b

```



## 선택적 매개변수와 기본 매개변수

#### 선택적 매개변수

```typescript
// 선택적 매개변수
const introduce = (name: string, age?: number): void => {
  console.log(`이름은 ${name} 이고, 나이는 ${age} 이다`)
}

introduce('jee') // 정상 동작 , age는 undefined로 출력
introduce('jee', 30) // 정상 동작
```

#### 기본 매개변수

```typescript
// 기본 매개변수
const introduce1 = (name: string, age: number = 100): void => {
  console.log(`이름은 ${name} 이고, 나이는 ${age} 이다`)
}

introduce1('jee', 40) // 정상 동작, age 40 출력
introduce1('jee')	// 에러 발생 x, age는 100으로 출력
```

