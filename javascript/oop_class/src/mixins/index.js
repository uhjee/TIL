class Car {
  constructor(number, model) {
    this.number = number;
    this.model = model;
  }
}

class InsurancePolicy {}

function makeInsurable(o) {
  o.addInsurancePolicy = function (p) {
    this.InsurancePolicy = p;
  };
  o.getInsurancePolicy = function () {
    return this.InsurancePolicy;
  };
  o.isInsured = function () {
    return !!this.InsurancePolicy;
  };
}

export const run = () => {
  // prototype에 직접 property 및 메소드 세팅
  makeInsurable(Car.prototype);

  const car1 = new Car(1011, '아반떼');
  car1.addInsurancePolicy(new InsurancePolicy());
  console.log(car1);
};
