module.exports = class Dictionary {
  items = {};

  has(key) {
    return key in this.items;
  }

  set(key, value) {
    this.items[key] = value;
  }

  remove(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }

  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }

  getItems() {
    return this.items;
  }

  values() {
    let values = [];

    for (const key of Object.keys(this.items)) {
      values.push(this.items[key]);
    }
    return values;
  }

  keys() {
    return Object.keys(this.items);
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }
};
