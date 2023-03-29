export class Vehicle {
  constructor() {
    this.passengers = [];
    console.log('Vehicle created!');
  }
  addPassenger(p) {
    this.passengers = [...this.passengers, p];
  }
}

export class Car extends Vehicle {
  static getNextVin() {
    return Car.nextVin++;
  }
  static areSimilar(car1, car2) {
    return car1.make === car2.make && car1.model === car2.model;
  }
  static areSame(car1, car2) {
    return car1.vin === car2.vin;
  }

  constructor(make, model) {
    super(); // 수퍼 클래스의 생성자 호출
    this.make = make; // 제조사
    this.model = model;
    this._userGears = ['P', 'N', 'R', 'D'];
    this._userGear = this._userGears[0];
    this.vin = Car.getNextVin();
    console.log('Car created!');
  }

  get userGear() {
    return this._userGear;
  }

  set userGear(value) {
    if (!this._userGears.includes(value))
      throw new Error(`유효하지 않은 기어:: ${value}`);
    this._userGear = value;
  }

  // 변속
  shift(gear) {
    this.userGear = gear;
  }

  deployAirbags() {
    console.log('BWOOSH!!!');
  }

  toString() {
    return `${this.make}/${this.model}/${this.vin}`;
  }
}
