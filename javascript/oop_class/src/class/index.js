import { Vehicle, Car } from './class/car.js';
// import { Car } from './class/carWithClosure.js';

export const run = () => {
  Car.nextVin = 0;
  // const car1 = new Car('테슬라', '모델S');
  // const car2 = new Car('현대', '아반떼');

  // car1.shift('D');
  // car2.shift('R');

  // console.log(car1.vin);
  // console.log(car2.vin);

  const v = new Vehicle();
  v.addPassenger('a');
  v.addPassenger('b');
  console.log(v.passengers);
  const c = new Car('현대', '소나타');
  c.addPassenger('c');
  c.addPassenger('d');
  console.log(c.passengers);

  console.log(v instanceof Vehicle);
  console.log(v instanceof Car);
  console.log(c instanceof Vehicle);
  console.log(c instanceof Car);

  console.log(c.toString());
};
