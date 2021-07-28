const LinkedList = require('./src/linkedList');
const DoublyLinkedList = require('./src/doublyLinkedList')

// ! Linked List

const list = new LinkedList();

// list.append('a');
// list.append('b');
// list.append('c');
// console.log(list);
// list.removeAt(1);
// console.log(list);
// list.insert(1, 'new B');
// console.log(list.toString());
// console.log(list.indexOf('c'));
// list.remove('new B');
// console.log(list.indexOf('c'));
// console.log(list.toString());
// console.log(list.size());
// console.log(list.isEmpty());
// // console.log(list.print());


// console.clear();

const dlist = new DoublyLinkedList();

dlist.insert(0, 'happy');
dlist.insert(1, 'life');
dlist.insert(2, 'life22');
dlist.insert(1, 'life00');
dlist.removeAt(3);
console.log(dlist.size());
console.log(dlist.toString());