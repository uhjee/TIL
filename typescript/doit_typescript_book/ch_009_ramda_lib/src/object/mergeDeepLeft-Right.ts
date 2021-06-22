import * as R from 'ramda';
import { IPerson, makeRandomIPerson } from '../model/person';
import { ILocation, makeRandomILocation } from '../model/location';
import { ICoordinates, makeRandomICoordinates } from '../model/coordinates';

const person: IPerson = makeRandomIPerson();
const location: ILocation = makeRandomILocation();
const coordinates: ICoordinates = makeRandomICoordinates();

console.log(location);
console.log(coordinates);

const newLocation = R.mergeDeepLeft(location, { coordinates });
const newLocation1 = R.mergeDeepRight(location, { coordinates });
console.log(newLocation);
console.log(newLocation1);

const newPerson = R.mergeDeepRight(person, { newLocation1 });

console.log(newPerson);
