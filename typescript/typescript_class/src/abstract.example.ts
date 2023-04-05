module.exports = (function app() {
  abstract class Animal {
    move(): void {
      console.log('움직인다.');
    }

    abstract makeSound(): void;
  }

  class Dog extends Animal {
    makeSound() {
      console.log('멍멍');
    }
  }

  const run = () => {
    // 직접 인스턴스 생성 불가
    // const t1 = new Animal();

    const d1 = new Dog();
    d1.move();
    d1.makeSound();
  };
  return {
    run,
  };
})();
