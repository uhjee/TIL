import * as R from 'ramda'
import { IPerson, makeRandomIPerson } from '../model/person'
import { displayPersons } from '../model/person/displayPerson'

const persons: IPerson[] = R.range(1, 4 + 1).map(makeRandomIPerson)
// R.sortWith, R.descend 사용
const nameSortedPersons = R.sortWith([R.descend(R.prop('name'))])(persons)
// R.sortWith,, R.ascend 사용
const ageSortedPersons = R.sortWith([R.ascend(R.prop('age'))])(persons)

displayPersons('by name ')(nameSortedPersons)
displayPersons('by age ')(ageSortedPersons)

