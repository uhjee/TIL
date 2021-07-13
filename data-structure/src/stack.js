class Stack {
  items = [];

  // 파라미터 여러개 받을 수 있도록 ...
  push(...argus) {
    argus.forEach(argu => {
      this.items.push(argu);
    });
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
    return (this.items = []);
  }

  size() {
    return this.items.length;
  }

  print() {
    return this.items.toString();
  }
}

const stack = new Stack();
stack.push(1, 2, 3);
console.log(stack.print());

console.log(stack.pop());
console.log(stack.print());

console.log(stack.peek());
console.log(stack.print());

const stack2 = new Stack();
console.log(stack2.isEmpty());
stack2.push('girl');
console.log(stack2.isEmpty());

stack2.push('boy');
console.log(stack2.print());
console.log(stack2.size());

stack2.clear();
console.log(stack2.isEmpty());

console.log(stack2.size());
