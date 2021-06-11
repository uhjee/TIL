export function* rangeGenerator(from: number, to: number) {
  let value = from;
  while (value < to) {
    yield value++;
  }
}

// while 패턴으로 동작하는 generator
let iterator = rangeGenerator(1, 3 + 1);

while (1) {
  const { value, done } = iterator.next();
  if (done) break;
  console.log(value);
}

// for ... of 형태로 동작하는  generator
for (let value of rangeGenerator(4, 6 + 1)) {
  console.log(value);
}
