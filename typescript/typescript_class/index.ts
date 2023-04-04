const Person = require('./src/Person');

const p1 = new Person('lala');
const p2 = new Person('lala', 'huhu');

console.log(p1.getFullName());
console.log(p2.getFullName());
