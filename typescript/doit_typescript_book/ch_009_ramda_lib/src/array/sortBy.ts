import * as R from 'ramda'
import { IPerson, makeRandomIPerson } from '../model/person'
import { displayPersons } from '../model/person/displayPerson'

const persons: IPerson[] = R.range(1, 4 + 1).map(makeRandomIPerson)

const nameSortedPersons = R.sortBy(R.prop('name'))(persons)
const ageSortedPersons = R.sortBy(R.prop('age'))(persons)

displayPersons('by name')(nameSortedPersons)
displayPersons('by age')(ageSortedPersons)
