let pet = {
  swim: () => {
    console.log('swim~~');
  },
};

if ('swim' in pet) {
  pet.swim();
}

const person = {
  name: undefined,
};

if ('name' in person) {
  console.log(person.name); // 출력됨
}

delete person.name;
console.log('name' in person); // false

abstract class Animal {
  constructor() {}
  move() {
    console.log('moving~');
  }
  abstract sayMyName(): void;
}

class Dog extends Animal {
  constructor(public name: string) {
    super();
  }
  swim() {
    console.log('swim~');
  }
  sayMyName(): void {
    console.log('개');
  }
}
class Bird extends Animal {
  constructor() {
    super();
  }
  fly() {
    console.log('fly~~');
  }
  sayMyName(): void {
    console.log('세');
  }
}
class Human extends Animal {
  constructor() {
    super();
  }
  swim() {
    console.log('swim~');
  }
  sayMyName(): void {
    console.log('인강');
  }
}

const dog = new Dog('jake');

console.log('move' in dog); // true

const move = (animal: Animal) => {
  if ('swim' in animal) {
    animal.sayMyName();
    if (animal instanceof Human) {
      // if (animal.constructor === Human) {
      animal.swim();
    }
  } else {
    animal.move();
  }
};

const human = new Human();
const bird = new Bird();

[dog, human, bird].forEach((i) => move(i));
