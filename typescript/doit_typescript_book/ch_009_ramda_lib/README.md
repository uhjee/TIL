ch.009 ramda library

## 09-1. ramda 라이브러리 개요

## 09-02. ramda 기본 사용법

### range 함수

```typescript
R.range(최소값, 최댓값)
```

- 최소값부터 최댓값-1까지 연속된 숫자 배열 생성

### tap 함수 - debugging

```typescript
R.tap(콜백함수)(배열)
```

### pipe 함수

- 함수를 조합하는 함수

사용(호출)

```typescript
import { range, pipe, tap } from 'ramda'

const array: number[] = range(1, 9 + 1)

// ! pipe 함수 사용
pipe(
  //
  tap((n) => console.log(n)),
)(array)

```

포인트가 없는 함수, 부분함수로 사용

```typescript
import { range, pipe, tap } from 'ramda'

// ! 포인트가 없는 함수 : 2차 고차 함수로 1번만 인자가 입력된 상태? 부분함수? 생성
export const dump = pipe(
  //
  tap((n) => console.log(n)),
)

// 마지막 파라미터 받음
dump(range(1, 100 + 1))

```

포인트가 없는 함수로 dump를 생성할 시, 반환값이 any가 되게 된다.

따라서  type assertion(타입 단언)을 사용해서 선언, 반환값 타입을 `T[]`로 변경

```typescript
// type assertion 타입 단언 사용 
//  - 반환값의 타입을 any -> T[]  변경
export const dump = <T>(array: T[]): T[] =>
  pipe(
    //
    tap((n) => console.log(n)),
  )(array) as T[] // 반환값 자체가 T[] 로 명시(명시적 형변환 느낌)
```

- **타입단언**: typescript의 타입추론 기능이 강력하긴 하지만, 필요에 따라, 수동으로 컴파일러에게 특정 변수에 대해 타입 힌트를 줘야할 때가 있다.

  (java 의 명시적 형변환 느낌이지만, 타입단언은 runtime에 영향을 미치지 않는다. 오로지 comple시에만 타입을 변경한다)

### 자동 커리 auto curry

람다 라이브러리 함수들은 다음과 같이 사용 가능

1. 매개변수 2개인 일반함수처럼 사용
2. 2차 고차함수로 사용

```typescript
import * as R from 'ramda'
console.log(  
    R.add(1, 2),   // 3   - 일반 함수
    R.add(1)(2)    // 3   - 고차 함수
)
```

### R.curryN 함수

람다 라이브러리 함수들은 자동 커리를 지원하기 위해, 매개변수의 개수를 모두 정해두었다.

따라서 다음과 같이 가변 인수 형태로 구현되지 않았다고 한다.

```typescript
export const sum = (...numbers: number[]): number => 
	numbers.reduce((result: number, sum: number) => result + sum, 0)

//호출
console.log(sum(1, 2, 3, 4))// 10
```

curryN 함수는 위와 같은 **'가변 인수를 받는 1차함수'**를 **'N개의 커리 매개변수를 받는 N차 고차함수'**로 변경한다

```typescript
R.curryN(N, 함수)
```

```typescript
//구현
const currySum: Function = curryN(4, sum)

```

```typescript
//호출

console.log(  			
    currySum(),            // [Function]  
	currySum(1),           // [Function]  
	currySum(1)(2),        // [Function]  
	currySum(1)(2)(3),     // [Function]  
	currySum(1)(2)(3)(4)   // 10
)

console.log(sum(1, 2, 3, 4))// 10
console.log(currySum(1)(2)(3)(4)) // 10
```



## 09-3. 배열에 담긴 수 다루기

### 선언형 프로그래밍 declarative programming

- 보통 함수형은 선언형으로 코드 작성

- 선언형 프로그래밍에서는 단순 데이터 값보다 배열 형태를 주로 사용

  ```typescript
  import * as R from 'ramda'
  
  // ! 기존 명령형 코드 - '값' 으로 데이터를 다룸
  const value = 1
  const newValue: number = R.inc(value)
  console.log(newValue)
  
  // ! 선언형 - '배열'로 데이터를 다룸
  const newArray: number[] = R.pipe(R.map(R.inc))([value])
  console.log(newArray)
  ```

  
