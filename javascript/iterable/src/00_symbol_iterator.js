let range = {
  from: 1,
  to: 5,
};

// ! range 객체를 iterable 객체로 만드려면 [Symbol.iterator] 메소드 추가해야함

/**
 * 01. for ...of 는 Symbol.iterator 호출(Symbol.iterator는 반드시 iterator 객체를 반환해야 함)
 *    - iterator 객체: next() 메소드를 가진 객체
 * 02. 이후 for ...of는 반환된 객체(iterator) 만을 대상으로 동작
 * 03. for... of 에 다음 값이 필요하면, for ... of 는 iterator의 next() 호출
 * 04. next()의 반환값은 {value: any, done: true} 의 형태이고,
 *      done = true 는 반복이 종료되었음을 의미
 *      done = false 는 value에 다음 값이 저장
 */

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

// 의도한 대로 동작
for (let value of range) {
  console.log(value);
}
