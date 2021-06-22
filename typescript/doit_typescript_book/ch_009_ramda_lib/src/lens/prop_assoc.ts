import * as R from 'ramda'
import { IPerson, makeRandomIPerson } from '../model/person'

const person : IPerson = makeRandomIPerson()

// prop() - getter
const getName = R.pipe(
  R.prop('name'),
  R.tap(name => console.log(name))
)


const originalName = getName(person);


// assoc() - setter
const modifiedPerson = R.assoc('name', 'Albert Einstein')(person)

const modifiedName = getName(modifiedPerson)
