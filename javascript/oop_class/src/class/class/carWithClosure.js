// IIFE를 통해 closure 생성 - WeakMap
export const Car = (function () {
  const carProps = new WeakMap();

  class Car {
    constructor(make, model) {
      this.make = make; // 제조사
      this.model = model;
      this._userGears = ['P', 'N', 'R', 'D'];
      carProps.set(this, { userGear: this._userGears[0] });
    }

    get userGear() {
      return carProps.get(this).userGear;
    }

    set userGear(value) {
      if (!this._userGears.includes(value))
        throw new Error(`유효하지 않은 기어:: ${value}`);
      carProps.get(this).userGear = value;
    }

    // 변속
    shift(gear) {
      this.userGear = gear;
    }
  }

  return Car;
})();
