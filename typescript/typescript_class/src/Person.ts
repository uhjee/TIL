module.exports = class Person {
  // typescripts는 필드를 반드시 선언해야 함(ES6 class와의 차이점)
  private firstName: string;
  private lastName: string;

  // constructor(method) overload...
  constructor(firstName: string);
  constructor(firstName: string, lastName: string);
  constructor(firstName: string, lastName?: string) {
    this.firstName = firstName;
    if (lastName) {
      this.lastName = lastName;
    }
  }

  getFullName() {
    return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`;
  }
};
