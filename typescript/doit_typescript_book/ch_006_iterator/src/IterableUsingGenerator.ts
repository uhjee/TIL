// iterable의 메소드로 동작하는 generator 구현
export class IterableUsingGenerator<T> implements Iterable<T> {
  constructor(private values: T[], private currentIndex: number = 0) {}

  [Symbol.iterator] = function* () {
    while (this.currentIndex < this.values.length) {
      yield this.values[this.currentIndex++]; // yield : 1.iterator 생성, iterable 역할 수행
    }
  };
}

for (let item of new IterableUsingGenerator([1, 2, 3])) {
  console.log(item); // 1, 2, 3
}

for (let item of new IterableUsingGenerator(['hello', 'your', 'world', '!'])) {
  console.log(item);
}
