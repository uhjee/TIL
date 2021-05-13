import d from './modules/defaultModule.js';
import { sayHello, sayHi, COUNTRY, animals , sayBye as bye} from './modules/namedModule.js';

// strict mode로 실행


console.log('[Module System...]');
sayHello();
sayHi();
const user = d.getUser();

console.log(user);

console.log(COUNTRY);

console.log(animals);
console.log(d.animals);

// sayBye();
bye();

console.log(d.findKey(user, 31));
console.log(d.findKey(user, 'jee'));

console.log(d.makeObjToArray(user));