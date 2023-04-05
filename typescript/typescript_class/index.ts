const Person = require('./src/person');
const modifier = require('./src/modifier');
const constructorModifier = require('./src/constructor.modifier');
const readonlyTest = require('./src/readonly');
const staticExample = require('./src/static.example');
const abstractExample = require('./src/abstract.example');
// const p1 = new Person('lala');
// const p2 = new Person('lala', 'huhu');

// console.log(p1.getFullName());
// console.log(p2.getFullName());

abstractExample.run();
