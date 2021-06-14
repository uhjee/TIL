ch.008 함수 조합의 원리와 응용

## 08-1. 함수형 프로그래밍이란?

- 람다 수학
- 조합 논리
- 카테고리 이론

함수형 프로그래밍은 위 세 가지 수학 이론에 기반을 두고 있다... 고 한다..

typescript에서는 함수형 언어의 주요 개념인 **패턴 매칭**과 **고차 타입**이라는 기능을 생략함으로써 함수형 구문을 쉽게 만들었다..



## 08-2 제네릭 함수

### 제네릭 타입 generic type

number[], boolean[], string[] 등 의 배열은 T[]로 표현이 가능

이처럼 타입변수(type variable) 로 T를 표현할 때, 이를 제네릭 타입 generic type이라고 한다.

- 함수, 인터페이스, 클래스, 타입 별칭 에 적용할 수 있다.

typescript의 함수는 매개변수와 반환값에 타입이 존재하므로, 함수 조합을 구현할 때는 제네릭 함수 구문을 사용해 타입을 명시해줘야 한다.

### 제네릭  타입 구문

1. 함수

    ```typescript
    // 함수 선언식
    function func1<T>(a: T): void { ... }
    function func2<T, Q>(a: T, b: Q): void { ... }
    
    // 화살표 함수
    const func3 = <T>(a: T): void => { ... }
    const func4 = <T, Q>(a: T, b: Q): void => { ... }
    ```

2. 타입 별칭 type alias

    ```typescript
    type Type1Func<T> = (T) => void
    type Type2Func<T, Q> = (T, Q) => void
    type Type3Func<T, Q, R> = (T, Q) => R
    ```

    

### 함수의 역할 

#### Map

- 하나의 값을 받아 하나의 결과값을 내보내는 관계 : 일대일 관계(one-to-one-relationship) => mapping, map

  ```type
  type MapFunc<T, R> = (T) => R
  ```

  T 타입 인자를 하나 받아서  R타입 반환값 하나를 내보내는 함수의 타입 별칭

#### identity

- Map 함수의 일종

- 입력값 x를 가공없이 그대로 반환하는 것

  ```typescript
  type MapFunc<T, R> = (T) => R // map
  type IdentityFunc<T> = MapFunc<T, T> // identity
  ```

- 다음과 같이 사용 가능

  ```typescript
  const numberIdentity: IdentityFunc<number> = (x: number): number => x
  const stringIdentity: IdentityFunc<string> = (x: string): string => x
  const objectIdentity: IdentityFunc<object> = (x: object): object => x
  const arrayIdentity: IdentityFunc<any[]> = (x: any[]): any[] => x
  ```

  