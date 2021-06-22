import * as R from 'ramda'
import { makeLens, getter, setter, setterUsingFunc } from './lens'
import { IPerson, makeRandomIPerson } from '../model/person'

const nameLens = makeLens('name')
const getName = getter(nameLens)
const setName = setter(nameLens)
const setNameUsingFunc = setterUsingFunc(nameLens)

const person: IPerson = makeRandomIPerson()

const name = getName(person)
// console.log(name);
const newPerson = setName('jeehun jung')(person)
// console.log(newPerson);
const anotherPerson = setNameUsingFunc(name => `Mr. ${name}`)(person)
// console.log(anotherPerson);
const capitalPerson = setNameUsingFunc( R.toUpper)(person)
console.log(capitalPerson);
