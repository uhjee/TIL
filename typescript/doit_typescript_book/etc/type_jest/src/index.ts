// export const sum = (a: number, b: number): number => a + b;

/**
 * 공변, 반공변을 마스터 하자....
 */

// 공변: 일반적인 sup - sub type 관계
// sup 에는 sub를 할당할 수 있다.

// 01. class
class Vehicle {
  constructor(public name: string) {}
}

// const car: Vehicle = new Vehicle('hyundai');
// console.log(car);

type VehicleType = {
  name: string;
};

type CarType = {
  name: string;
  wheelCount: number;
  move(speed: number): void;
};

class Car extends Vehicle {
  constructor(name: string, public wheelCount: number) {
    super(name);
  }
  move(speed: number): void {
    console.log(`${this.name}은 ${speed}로 달리고 있습니다.`);
  }
}
const horse: VehicleType = new Vehicle('horse');
const car: CarType = new Car('avante', 4);

console.log(horse);
console.log(car);
car.move(100);
