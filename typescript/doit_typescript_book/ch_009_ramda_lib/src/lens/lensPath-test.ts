import * as R from 'ramda'
import { makeLens, getter, setter, setterUsingFunc } from './lens'
import { IPerson, makeRandomIPerson } from '../model/person'

// const nameLens = makeLens('name')
const longitudeLens = R.lensPath(['location', 'coordinates', 'longitude'])

const getLongitude = getter(longitudeLens)
const setLongitude = setter(longitudeLens)
const setLongitudeUsingFunc = setterUsingFunc(longitudeLens)

const person: IPerson = makeRandomIPerson()

const longitude = getLongitude(person)
console.log(longitude);
const newPerson = setLongitude(0.1234567)(person)
console.log(newPerson);
const anotherPerson = setLongitudeUsingFunc(R.add(0.123456))(person)
console.log(anotherPerson);
