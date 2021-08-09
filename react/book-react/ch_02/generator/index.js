function* generatorFunc() {
  try {
    console.log('#1');
    yield 10;
    console.log('#2');
    yield 20;
    console.log('#3');
    return 'finished';
  } catch (e) {
    console.log(`#error: ${e}`);
  }
}

const gen = generatorFunc(); // 제네레이터  객체  리턴
// console.log(gen.next());
// console.log(gen.return('jaja'));
// console.log(gen.throw('error !!!'));
// console.log(gen.next());
// console.log(gen.next());

// ! Iterable 반복가능한 객체
const arr = [1, 2, 3, 4];
const iter = arr[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());

// ! 제네레이터의 Symbol.iterator는 자기 자신을 반환한다
// console.log(gen[Symbol.iterator]() === gen);

function* f2() {
  yield 10;
  yield 20;
  yield 30;
}

for (const x of f2()) {
  console.log(x);
}

console.log([...f2()]);