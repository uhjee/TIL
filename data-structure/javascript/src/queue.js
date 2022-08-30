class Queue {
  items = [];

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.toString());
  }
}

// const q1 = new Queue();
// q1.enqueue(1);
// q1.enqueue(2);
// q1.enqueue(3);
// q1.print();
// q1.dequeue();
// console.log(q1.front());

class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// ! 우선순위 큐
class PriorityQueue {
  items = [];

  enqueue(element, priority) {
    const queueElement = new QueueElement(element, priority);
    if (this.isEmpty()) {
      this.items.push(queueElement);
    } else {
      let added = false;
      // 자신보다 큰 순서의 index 찾아서 그 자리에 쏙 들어가기
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > queueElement.priority) {
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      // 자신보다 큰 index가 없는 경우, 가장 끝에 넣어주기
      if (!added) {
        this.items.push(queueElement);
      }
    }
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items);
  }
}

// const pQ = new PriorityQueue();

// pQ.enqueue('a', 1);
// pQ.enqueue('b', 1);
// pQ.enqueue('c', 2);
// pQ.enqueue('d', 3);
// pQ.enqueue('a1', 1);
// pQ.print();

// ! 환형큐 (뜨거운 감자 게임)
// const hotPotato = (nameList, num) => {
//   const q = new Queue();

//   for (let i = 0; i < nameList.length; i++) {
//     q.enqueue(nameList[i]);
//   }

//   let eliminated = '';
//   while (q.size() > 1) {
//     for (let i = 0; i < num; i++) {
//       q.enqueue(q.dequeue()); // 환형 구성
//     }
//     eliminated = q.dequeue();
//     console.log(`${eliminated}를 퇴장시킵니다.`);
//   }
//   return q.dequeue();
// };

// const names = ['A', 'B', 'C', 'D', 'E'];
// const winner = hotPotato(names, 7);
// console.log(winner);

module.exports = { Queue, PriorityQueue };
