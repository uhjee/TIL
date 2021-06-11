//! for...of 가 아닌 개발자의 명시적 iterator 호출
let str = 'hello';

// fot...of 를 사용한 것과 동일한 작업
// for (let char of str)

// 직접 Symbol.iterator 호출(본래 for...of가 하던 짓) => 이터레이터 객체 가져옴
let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next(); // 다음 값이 필요하면 next() 호출
  if (result.done) break;
  console.log(result.value);
}

// ! Array.form() static method

let arr = Array.from(str);
arr.push('hello');
console.log(arr);
