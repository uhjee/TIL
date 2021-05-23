import Person, { makePerson } from './person/Person';
import IPerson from './person/IPerson';
import Chance from 'chance'; // export default 형태로 제공
import * as R from 'ramda'; // 여러개의 export 문으로 제공

const chance = new Chance();

let persons: IPerson[] = R.range(0, 2).map((n: number) => new Person(chance.name(), chance.age()));

console.log(persons);

// const testMakePerson = (): void => {
//   let jane: IPerson = makePerson('Jane');
//   let jack: IPerson = makePerson('jack');

//   console.log(jane, jack);
// };

// testMakePerson();
