const LinkedList = require('./src/linkedList');

// ! Linked List

const list = new LinkedList();

list.append('a');
list.append('b');
list.append('c');
console.log(list);
list.removeAt(1);
console.log(list);
list.insert(1, 'new B');
console.log(list.toString());
console.log(list.indexOf('c'));
list.remove('new B');
console.log(list.indexOf('c'));
console.log(list.toString());
console.log(list.size());
console.log(list.isEmpty());
// console.log(list.print());
