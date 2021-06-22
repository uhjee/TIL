import * as R from 'ramda';
import { IPerson, makeRandomIPerson } from '../model/person';

const keys: string[] = R.keys(makeRandomIPerson());
console.log('keys: ', keys); //keys:  [ 'name', 'age', 'title', 'location' ]

const values: any[] = R.values(makeRandomIPerson());
console.log('values: ', values);
