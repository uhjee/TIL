const LinkedList = require('./linkedList');
class HashTable {
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
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[${this.key}-${this.value}]`;
  }
}

//  ? hash값 충돌 해결 1. 체이닝 ------------------------------------------------------------------
class HashTableChaining {
  table = [];

  // 해시 함수 (private 메소드)
  #loseloseHashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i); // 각 문자의 아스키코드 합
    }
    return hash % 37;
  }

  // ? 체이닝을 통한 hash 값 충돌 해결
  put(key, value) {
    const position = this.#loseloseHashCode(key);
    console.log(`${position}-${key}`);
    if (this.table[position] == undefined) {
      this.table[position] = new LinkedList(); // linked list 생성
    }
    this.table[position].append(new ValuePair(key, value));
  }

  // ? 체이닝을 통한 hash 값 충돌 해결
  get(key) {
    const position = this.#loseloseHashCode(key);

    if (this.table[position] !== undefined) {
      let current = this.table[position].getHead();

      while (current.next) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }

      // 처음이나 마지막 원소인 경우, while문에 걸리지 않으므로 분기처리
      if (current.element.key === key) {
        return current.element.value;
      }
    }
    return undefined;
  }

  // ? 체이닝을 통한 hash 값 충돌 해결
  remove(key) {
    const position = this.#loseloseHashCode(key);

    if (this.table[position] !== undefined) {
      let current = this.table[position].getHead();

      while (current.next) {
        if (current.element.key === key) {
          this.table[position].remove(current.element);
          if (this.table[position].isEmpty()) {
            this.table[position] = undefined; // undefined 할당으로 삭제
          }
          return true;
        }
        current = current.next;
      }

      if (current.element.key === key) {
        this.table[position].remove(current.element);
        if (this.table[position].isEmpty()) {
          this.table[position] = undefined; // undefined 할당으로 삭제
        }
        return true;
      }
    }
    return false;
  }
}

// ? 선형 탐색법을 통한 hash 값 충돌 해결 -------------------------------
class HashTableLinearProbing {
  table = [];

  // 해시 함수 (private 메소드)
  #loseloseHashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i); // 각 문자의 아스키코드 합
    }
    return hash % 37;
  }

  // 해시 함수 개선(djb2 해시 함수) :: 전문가들이 즐겨 쓰는 해시 함수 중 하나
  #djb2HashCode(key) {
    let hash = 5381; // 임의의 소수
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  }

  put(key, value) {
    let position = this.#djb2HashCode(key);
    if (this.table[position] === undefined) {
      this.table[position] = new ValuePair(key, value);
    } else {
      let index = ++position; // 1을 미리 더한 값

      // ! 빈 인덱스까지 순회
      while (this.table[index] != undefined) {
        index++;
      }
      this.table[index] = new ValuePair(key, value);
    }
  }

  get(key) {
    let position = this.#djb2HashCode(key);

    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        return this.table[position].value;

        // index 순회하며 조회
      } else {
        let index = ++position;

        while (
          this.table[index] === undefined ||
          this.table[index].key !== key
        ) {
          index++;
        }
        if (this.table[index].key === key) {
          return table[index].value;
        }
      }
    }
    return undefined;
  }

  remove(key) {
    let position = this.#djb2HashCode(key);

    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        this.table[index] = undefined; // undefined 할당으로 삭제

        // index 순회하며 조회
      } else {
        let index = ++position;

        while (
          this.table[index] === undefined ||
          this.table[index].key !== key
        ) {
          index++;
        }
        if (this.table[index].key === key) {
          this.table[index] = undefined; // undefined 할당으로 삭제
        }
      }
    }
    return undefined;
  }
}

module.exports = {
  HashTable,
  HashTableChaining,
  HashTableLinearProbing,
};
