import { IPerson, makeIPerson } from './makeIPerson';
import { makeRandomILocation } from '../location';
import Chance from 'chance';

const c = new Chance();

export const makeRandomIPerosn = (): IPerson => makeIPerson(c.name(), c.age(), c.profession(), makeRandomILocation());
