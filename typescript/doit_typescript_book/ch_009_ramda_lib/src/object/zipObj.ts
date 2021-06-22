import * as R from 'ramda';
import { IPerson, makeRandomIPerson } from '../model/person';

const keys: string[] = R.keys(makeRandomIPerson());
const values: any[] = R.values(makeRandomIPerson());

const zippedPerson: IPerson = R.zipObj(keys, values) as IPerson;
console.log(zippedPerson);
