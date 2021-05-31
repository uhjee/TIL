// ! 01. object 타입의 재할당 가능 문제
let obj: object = { name: 'jee', age: 23 } // obj 선언 및 할당
console.log(obj)

obj = { name: 'goo', weight: 492 } // object Type이므로 재할당 가능
console.log(obj)

// ! 02. interface
// 인터페이스 생성
interface ivehicle {
  type: string
  wheelCount: number
  // 익명 인터페이스
  manufactor: {
    name: string
    country: string
  }
  price?: number // optional
}

// 인터페이스 인스턴스 생성
let hyundaiCar: ivehicle = {
  type: 'car',
  wheelCount: 4,
  manufactor: {
    name: 'hyundai',
    country: 'korea',
  },
}

console.log(hyundaiCar)

// 함수 argu를 익명 인터페이스로 선언
const printMe = (me: { type: string; wheelCount: number }) => {
  console.log(`${me.type} // ${me.wheelCount}`)
}

// 호출부에서는 따로 선언한 iVehicle type을 넣어줘도
// interface 조건만 맞으면 타입 통과하는 듯 ... 신기
printMe(hyundaiCar)

// console.clear();

class Person {
  public name: string
  public age?: number
}

let jack = new Person()
jack.name = 'jack'
jack.age = 30

console.log(jack)

// 생성자
class Person1 {
  constructor(public name: string, public age?: number) {}
}

const joy = new Person1('joy', 31)

console.log(joy)

class Person2 {
  name: string
  age?: number
  constructor(name: string, age?: number) {
    this.name = name
    this.age = age
  }
}

const joi = new Person2('joi', 42)
console.log(joi)

// 인터페이스 구현
interface IPerson3 {
  name: string
  age?: number
}

class Person3 implements IPerson3 {
  constructor(public name: string, public weight: number, public age?: number) {}
}

let phil = new Person3('phil', 70, 29)

console.log(phil)

// 추상 클래스
// abstract class 클래스이름 {
//   abstract 속성이름: 속성타입
//   abstract 메소드이름() { }
// }

abstract class Abstractperson5 {
  abstract name: string
  constructor(public age?: number) {}
}

class Person5 extends Abstractperson5 {
  constructor(public name: string, age?: number) {
    super(age) // super 키워드 - 부모의 생성자 호출
  }
}

const ruru = new Person5('ruru', 52)
console.log(ruru)

// static 속성
// class 클래스이름 {
//   static 정적속성이름: 속성타입
// }

class Book {
  public static initValue = 1000
  constructor(public title: string, public author: string) {}
}

const book1 = new Book('javascript_dev', 'zeroxho')
console.log(book1)
console.log(Book.initValue) // 클래스이름. 으로 접근, 인스턴스 변수명 x

// 비구조화 할당
interface IAnimal {
  name: string
  legs: number
}

const dog: IAnimal = { name: 'dog', legs: 5 }
console.log(dog)
;(function () {
  let { name, legs } = dog
  console.log(name)
  console.log(legs)
})()

const obj1: object = {
  name: 'd loopy',
  age: 20,
}

console.log(obj1)

// console.log(obj1.name);   // object 타입에는 name 프로퍼티가 없어서 오류 발생
console.log((<{ name: string }>obj1).name) // 형변환

// 타입 단언 type assertion
interface INameable {
  name: string
}

let obj5: object = {
  name: 'jack',
}

let name1 = (<INameable>obj5).name // 타입 단언 1

let name2 = (obj5 as INameable).name // 타입 단언 2

console.log(name1, name2)

// getter, setter
class Person7 {
  constructor(private _name: string, public readonly age: number) {}

  public get name(): string {
    return this._name + ' of getter'
  }

  public set name(v: string) {
    this._name = v
  }
}

let person7: Person7 = new Person7('jake', 29)
console.log(person7)
console.log(person7.name)

person7.name = 'dong'

console.log(person7)
console.log(person7.name)

// class 내부의 this
class Person8 {
  private name: string = 'default name'
  private age: number = 10

  public speak(this: Person8) {
    console.log(this)

    console.log(`내 이름은 ${this.name}이구요, 나이는 ${this.age}입니다`)
  }
}

let person8: Person8 = new Person8()

person8.speak()

// indexable interface,  class
interface iPerson10 {
  [index: string]: string | number
}

class Person10 implements iPerson10 {
  [index: string]: string
}

let person10 = new Person10()

person10.name = 'jeem'
console.log(person10.name)

// ! readonly
interface iReadonly {
  readonly name: string
  readonly country: string
}

// 생성 시 할당
let readonly1: iReadonly = {
  name: 'jee',
  country: 'Korea',
}

console.log(readonly1)

// readonly1.name = 'jee1' // error

let readonlyArr: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// let readonlyArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(readonlyArr)

// readonlyArr.push(4)

// static
interface iAnimal {
  name: string
  legs?: number

  move(distance: number): void
}

class Bird implements iAnimal {
  constructor(public name: string) {}

  move(distance: number) {
    console.log(`${distance} 만큼 날았다.`)
  }
  static isBird = (animal: iAnimal): boolean => {
    return animal instanceof Bird
  }
}

let bird1: Bird = new Bird('bird1')

console.log(Bird.isBird(bird1))

console.log(Bird.isBird({ name: 'jeeha', move(num: number) {} }))

interface iPerson11 {
  name: string
  age?: number
}

// 방법 1
let person1 = <iPerson11>{}
person1.name = 'jeeee'

// 방법 2
let person2 = {} as iPerson11
person1.name = 'jeee'

// extending interface
interface iAnimal15 {
  name: string
}

interface iAnimal16 {
  age: number
}

interface iPerson15 extends iAnimal15, iAnimal16 {
  country: string
}

let person15 = {} as iPerson15
person15.name = 'jee'
person15.age = 16
person15.country = 'Korea'

console.log(person15)

// static을 활용한 singleton pattern
class SingleTon {
  private static instance: SingleTon | null = null

  public static getInstance(): SingleTon {
    if (SingleTon.instance === null) {
      SingleTon.instance = new SingleTon()
    }
    return SingleTon.instance
  }

  private constructor() {}
}

const singleA: SingleTon = SingleTon.getInstance()
const singleB: SingleTon = SingleTon.getInstance()

console.log(singleA === singleB) // true
