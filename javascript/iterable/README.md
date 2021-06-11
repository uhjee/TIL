# Iterable 반복가능한

[출처: modern JS_iterable](https://ko.javascript.info/iterable)

배열을 일반화한 객체. iterable을 활용하면 어떤 객체에서든 `for ... of` 구문을 사용할 수 있다.

## Symbol.iterator

1. for ...of 는 iterable 객체의  Symbol.iterator 메소드 호출

   - Symbol.iterator는 반드시 iterator 객체를 반환해야 함

   - iterator 객체: next() 메소드를 가진 객체

2. 이후 for ...of는 반환된 객체(iterator) 만을 대상으로 동작

3. for... of 에 다음 값이 필요하면, for ... of 는 iterator의 next() 호출

4. next()의 반환값은 {value: any, done: true} 의 형태이고,

   - `done = true` 는 반복이 종료되었음을 의미
   - `done = false` 는 value에 다음 값이 저장

```js
// iterable 객체로 만들 range
let range = {
  from: 1,
  to: 5,
};

// ! range 객체를 iterable 객체로 만드려면 [Symbol.iterator] 메소드 추가해야함

// 01. for...of 최초 호출 시, Symbol.iterator 호출
range[Symbol.iterator] = function () {
  // Symbol.iterator 는 이터레이터 객체 반환
  // 02. 이후 for...of는 반환된 이터레이터 객체만을 대상으로 동작, 이때 다음 값도 정해진다.
  return {
    current: this.from, // method이기 때문에 this는 메소드가 속한 객체
    last: this.to,

    // 03. for...of 구문에 의해 반복마다 next() 호출
    next() {
      const self = this;
      // 04. next() 는 value, done 프로퍼티를 가진 객체를 반환해야 함
      if (self.current <= self.last) {
        return { value: self.current++, done: false };
      } else {
        return { done: true };
      }
    },
  };
};

// 의도한 대로 동작
for (let value of range) {
  console.log(value);
}

```



 iterable 객체의 핵심은 관심사의 분리(Separation of concern, SoC)

- range (iterable 객체)에는 메소드 next() 가 없다
- 대신 range의 [Symbol.iterator] 메소드를 호출해서 얻은 이터레이너 객체와 이 객체의 메소드 next()에서 반복에 사용된 값을 만들어낸다.

따라서 이터레이터 객체와 반복 대상인 객체를 분리할 수 있다.

아래에서는 이터레이터 객체와 반복 대상 객체를 합쳐 range 객체 자체가 이터레이터 객체가 되도록 구현

- 이터레이터 객체: next()를 갖는 객체

```js

// ! 이터레이터 객체와 반복 대상인 객체를 합쳐서 range 자체를 이터레이터로 만들기 (더 간단하게 구현)
range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this; // this는 range 객체
  },

  next() {
    if (this.current <= this.to) {
      return { value: this.current++, done: false };
    } else {
      return { done: true };
    }
  },
};
```



## 문자열은 iterable이다

배열과 문자열은 가장 널리 쓰이는 내장 iterable

## Array.from()  - static method

유사배열 그리고 이터러블 객체를 배열로 만들어준다.