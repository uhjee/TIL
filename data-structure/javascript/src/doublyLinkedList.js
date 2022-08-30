class Node {
  constructor(element) {
    this.element = element;
    this.next = null; // 마지막 요소의 next는 항상 null;
    this.prev = null; // new
  }
}
module.exports = class DoublyLinkedList {
  length = 0;
  head = null;
  tail = null; // new

  insert(position, element) {
    // 범위 외의 값인지 체크
    if (position >= 0 && position <= this.length) {
      const node = new Node(element);
      let current = this.head;
      let previous = null;
      let index = 0;

      // 첫 번째 원소인 경우
      if (position === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
        // 마지막 원소인 경우
      } else if (position === this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;

        // 중간에 넣는 경우
      } else {
        // 원하는 위치까지 순회(head부터 순회)
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        // 새로운 node 삽입
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }
      this.length += 1;
      return true;
    } else {
      return false;
    }
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head;
      let previous = null;
      let index = 0;

      // 첫 번째 원소인 경우
      if (position === 0) {
        this.head = current.next;

        if (this.length === 1) {
          this.tail = null;
        } else {
          this.head.prev = null;
        }

        // 마지막 원소인 경우
      } else if (position === this.length - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;

        // 중간 원소 삭제
      } else {
        // position 까지 순회
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.length--;

      return current.element;
    } else {
      return null;
    }
  }

  append(element) {
    const node = new Node(element);
    let current = null;

    // 리스트가 비어있는 경우
    if (this.head === null) this.head = node;
    // 리스트가 비어있지 않은 경우
    else {
      current = this.head;

      // 마지막 원소를 찾을 때까지 계속 루프 순환
      while (current.next) {
        console.log(current.next);
        current = current.next;
      }

      // 마지막 요소의 next에 node 넣기
      current.next = node;
    }

    this.length += 1; // 리스트의 크기 업데이트
  }

  remove(element) {
    return this.removeAt(this.indexOf(element));
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (element === current.element) {
        return index;
      }
      index += 1;
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.length === 0;
  }
  size() {
    return this.length;
  }

  toString() {
    let current = this.head;
    let string = '';

    while (current) {
      string +=
        current.next !== null ? `${current.element}, ` : current.element;
      current = current.next;
    }
    return string;
  }

  getHead() {
    return this.head;
  }
  // print() {
  //   console.log(this.toString());
};
