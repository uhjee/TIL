/**
 * stack 자료 구조 구현체
 */
export default class Stack<T> {
  private items: T[] = [];

  push(...args: T[]) {
    for (const arg of args) {
      this.items.push(arg);
    }
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.toString());
  }
}
