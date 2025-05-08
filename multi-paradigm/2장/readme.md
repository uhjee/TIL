# 2장 함수형 프로그래밍과 타입 시스템 그리고 LISP

## 타입스크립트의 타입 추론과 함수 타입

- 타입스크립트는 타입추론 기능으로 명시적인 타입 선언 없이도 안전한 코드 작성 가능
- itentity 함수: 제네릭 타입 T를 받아서 그대로 반환하는 항등 함수

  ```ts
  /**
   * 제네릭 타입 T를 받아서 그대로 반환하는 항등 함수
   * @param arg 입력받은 제네릭 타입 T의 값
   * @returns 입력받은 arg와 동일한 값을 반환한다
   */
  function identity<T>(arg: T): T {
    return arg;
  }

  console.log(identity(1)); // 1
  console.log(identity('a')); // a
  ```

- constant 함수: 제네릭 타입 T를 받아서 항등 함수를 반환하는 함수

  ```ts
  /**
   * 제네릭 타입 T를 받아서 항등 함수를 반환하는 함수
   * @param arg 입력받은 제네릭 타입 T의 값
   * @returns 항등 함수를 반환한다
   */
  function constant<T>(arg: T): () => T {
    return () => arg;
  }

  const f = constant(1);
  console.log(f()); // 1
  const getHello = constant('hello');
  console.log(getHello() + getHello()); // hellohello
  ```

## 변수와 상수의 타입 추론

- 변수와 상수를 초기화할 때 타입스크립트는 해당 **값**으로부터 타입을 추론

  ```ts
  // type을 true라는 리터럴 타입으로 추론(재할당 불가하기 때문)
  const selected = true;

  // type을 boolean 타입으로 추론
  let checked = true;
  ```
