const LinkedList = require('./src/linkedList');
const DoublyLinkedList = require('./src/doublyLinkedList');
const Set = require('./src/set');
const Dictionary = require('./src/dictionary');
const {
  HashTable,
  HashTableChaining,
  HashTableLinearProbing,
} = require('./src/hashTable');
const BinarySearchTree = require('./src/binaryTree');

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

// ! Doubly linked list
const dlist = new DoublyLinkedList();

// dlist.insert(0, 'happy');
// dlist.insert(1, 'life');
// dlist.insert(2, 'life22');
// dlist.insert(1, 'life00');
// dlist.removeAt(3);
// console.log(dlist.size());
// console.log(dlist.toString());

// ! Set
const set = new Set();
// set.add(1);
// set.add(2);
// set.add(3);
// set.add(4);
// console.log(set.has(1));
// set.remove(1);
// console.log(set.has(1));

// console.log(set.size());
// console.log(set.values());

// const set1 = new Set();
// set1.add(10);
// set1.add(11);

// // 합집합
// const unionSet = set.union(set1);
// console.log(unionSet.values());

// // 교집합
// set1.add(2);
// console.log(set.intersection(set1).values());

// // 차집합
// console.log(set.difference(set1).values());

// // 부분 집합
// const set2 = new Set();
// for (let i = 0; i < 10; i += 1) {
//   set2.add(i);
// }
// console.log(set2.values());
// console.log(set.subset(set2));

// ! dictionary( map)
const dic = new Dictionary();

// dic.set('A', 'aaa');
// dic.set('B', 'bb');
// dic.set('C', 'ccc');
// dic.remove('C');
// console.log(dic.get('B'));
// console.log(dic.keys());
// console.log(dic.values());
// console.log(dic.getItems());

// ! Hash Table
const hashtable = new HashTable();

// hashtable.put('A1', ' a111');
// hashtable.put('Paul', ' happt');
// hashtable.put('Mindy', ' happt');
// console.log(hashtable.get('A1'));
// console.log(hashtable.remove('A1'));
// console.log(hashtable.get('A1'));

// // chaining
const hashtableChaining = new HashTableChaining();

// hashtableChaining.put('A1', ' a111');
// hashtableChaining.put('Paul', ' happt');
// hashtableChaining.put('Mindy', ' happt');
// console.log(hashtableChaining.get('A1'));
// console.log(hashtableChaining.remove('A1'));
// console.log(hashtableChaining.get('A1'));

const hashTableLinearProbing = new HashTableLinearProbing();

// hashTableLinearProbing.put('Paul', 'happy1');
// hashTableLinearProbing.put('Mindy', 'happy2');
// console.log(hashTableLinearProbing.get('Paul'));

// ! Binary Search Tree
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

// 중위 순회
// tree.inOrderTraverse((value) => {
//   console.log(value);
// });

// 전위 순회
// tree.preOrderTraverse((value) => {
//   console.log(value);
// });

// tree.postOrderTraverse(value => {
//   console.log(value);
// });

// const result = tree.max();
const result = tree.remove(7);

console.log(result);