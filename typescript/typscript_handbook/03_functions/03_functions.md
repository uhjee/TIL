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

