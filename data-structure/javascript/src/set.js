module.exports = class Set {
  items = {}; // 중복 제거를 위해 배열이 아닌 객체 사용

  // 집합에 해당 프로퍼티가 있는지 판별
  has(value) {
    // return  value in this.items; // in 연산자
    return this.items.hasOwnProperty(value); // Object prototype 메소드
  }

  add(value) {
    if (!this.has(value)) {
      this.items[value] = value; // key와 value를 동일하게 지정
      return true;
    }
    return false;
  }

  remove(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.keys(this.items);
  }

  // 합집합
  union(otherSet) {
    const unionSet = new Set();

    let values = this.values();
    for (const value of values) {
      unionSet.add(value);
    }
    values = otherSet.values();
    for (const value of values) {
      unionSet.add(value);
    }
    return unionSet;
  }

  // 교집합
  intersection(otherSet) {
    const intersectionSet = new Set();

    const values = this.values();
    for (const value of values) {
      if (otherSet.has(value)) {
        intersectionSet.add(value);
      }
    }

    return intersectionSet;
  }

  // 차집합
  difference(otherSet) {
    const differenceSet = new Set();

    const values = this.values();
    for (const value of values) {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    }

    return differenceSet;
  }

  // 부분 집합:: otherSet의 부분집합인가
  subset(otherSet) {
    // 개수 체크
    if (this.size() > otherSet.size()) return false;
    else {
      const values = this.values();
      for (const value of values) {
        if (!otherSet.has(value)) {
          return false;
        }
      }
      return true;
    }
  }
};
