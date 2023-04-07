## `in` operator

- type narrowing 에 쓰임

- js의 `in`

  - javascript 에도 존재하는 operator
  - 객체에 해당 프로퍼티가 존재하면 `true` 반환
  - 프로퍼티의 'key 존재 여부'에 대한 반환을 할 뿐, value가 undefined이든 말든 상관 없음

  ```js
  const person = {
    name: undefined,
  };

  if ('name' in person) {
    console.log(person.name); // 출력됨
  }
  ```

  - `delete` 연산자로 제거된 속성에 대해서는 `false` 반환

  ```js
  const person = {
    name: undefined,
  };
  delete person.name;
  console.log('name' in person); // false
  ```

  - 프로토타입 체인에 의해 접근할 수 있는 프로퍼티에 대해서도 `true` 반환

  ```js
      class Animal {
      constructor() {}
      move() {
      console.log('moving~');
      }
      }

      class Dog extends Animal {
      constructor(public name: string) {
      super();
      }
      }

      const dog1 = new Dog('jake');

      console.log('move' in dog1); // true
  ```

- ts에서 활용법 (type narrowing)

is operator

```

```
