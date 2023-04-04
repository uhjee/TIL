module.exports = class Person {
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
