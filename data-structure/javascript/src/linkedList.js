// ! linked List의 원소 구성 요소
//  - element: 해당 원소의 데이터
//  - next : 다음 참조
class Node {
  constructor(element) {
    this.next = null; // 마지막 요소의 next는 항상 null;
    this.element = element;
  }
}

module.exports = class LinkedList {
  length = 0;
  head = null; // 연결이 시작되는 지점의 참조

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

  // 첫 번째 인자의 위치에, 요소 추가
  insert(position, element) {
    if (position > -1 && position <= this.length) {
      const node = new Node(element);
      let current = this.head;
      let previous = null;
      let index = 0;

      if (position === 0) {
        node.next = current;
        this.head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current; // 본래 그 자리에 있던 원소를 자신의 다음 요소로
        previous.next = node;
      }
      this.length += 1;
    } else {
      return false;
    }
  }

  removeAt(position) {
    // 범위 외의 값인지 체크
    if (position > -1 && position < this.length) {
      let current = this.head;
      let previous = null;
      let index = 0;

      //첫 번째 원소 삭제
      if (position === 0) {
        this.head = current.next; // 그 다음 요소로 변경
      } else {
        // position 자리 이전의 원소를 찾을 때까지 계속 루프 순환
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next; // 원래 자신의 위치를 다음 요소로 변경
      }
      this.length -= 1;
      return current.element;
    } else {
      return null;
    }
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
  // }
};
