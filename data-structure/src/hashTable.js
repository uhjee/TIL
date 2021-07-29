module.exports = class HashTable {
  table = [];

  // 해시 함수 (private 메소드)
  #loseloseHashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i); // 각 문자의 아스키코드 합
    }
    return hash % 37;
  }

  put(key, value) {
    const position = this.#loseloseHashCode(key);
    console.log(`${position}-${key}`);
    this.table[position] = value;
  }

  get(key) {
    return this.table[this.#loseloseHashCode(key)];
  }

  remove(key) {
    this.table[this.#loseloseHashCode(key)] = undefined;
  }
};
