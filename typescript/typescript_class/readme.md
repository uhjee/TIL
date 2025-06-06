# typescript class

객제지향을 지원하기 위해 ES6의 class에 고유한 확장 기능들이 몇 개 있다.

## 1. 클래스 정의

- ES6의 클래스는 구현부에 메소드만 선언할 수 있고, 필드는 생성자 함수의 내부에서 선언하고 초기화한다.

```js
class Person {
  constructor(firstName) {
    this.firstName = firstName;
  }
}
```

- 반면 TS의 클래스는 필드를 직접 구현부에 선언해주어야 한다.

```js
class Person {
  // 구현부에 직접 필드 선언
  firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}
```

## 2. 접근 제한자

- TS의 클래스는 객체지향 언어가 제공하는 modifier를 그대로 제공

  | 접근 가능성      | `public` | `protected` | `private` |
  | ---------------- | -------- | ----------- | --------- |
  | 클래스 내부      | O        | O           | O         |
  | 자식 클래스 내부 | O        | O           | X         |
  | 클래스 인스턴스  | O        | X           | X         |

## 3. 생성자 파라미터에 접근 제한자 선언 가능

- 접근 제한자는 생성자 파라미터에 선언 가능
- _이때 접근 제한자가 사용된 파라미터는 암묵적으로 클래스 필드에 선언되고, 생성자 내부에서 별도의 초기화가 없더라도 암묵적으로 해당 타입의 초기화값으로 초기화_
- 접근제한자가 없는 파라미터는 기본 함수의 파라미터와 같이 생성자 함수 내부에서만 유효한 지역변수가 되기 때문에, 클래스 내부에서 접근할 수 없음

## 4. `readonly` 키워드

- `readonly` 키워드를 사용할 경우, 아래 경우에서만 할당이 가능하고 이후는 할당 불가능

  1. 클래스 내부에서 해당 필드 직접 선언
  2. 생성자 함수에서 초기화

- setter가 없는 개념

## 5. `static` 키워드

- ES6에서는 함수에만 `static` 키워드 사용 가능
- TS 에서는 함수 뿐 아니라 필드에도 `static` 키워드 사용 가능


## 6. abstract 클래스

- 하나 이상의 *추상 메소드*를 포함한 클래스
- 직접 인스턴스 생성 불가
- 추상 메소드
  - 구현부 없이 메소드 이름과 타입만 선언된 메소드
  - 구현은 상속받은 서브 클래스에서 함
  - `abstract` 키워드 사용