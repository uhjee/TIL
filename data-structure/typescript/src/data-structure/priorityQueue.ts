class QueueElement<T> {
  element: T;
  priority: number;

  constructor(element: T, priority: number) {
    this.element = element;
    this.priority = priority;
  }
}

export default class PriorityQueue<T> {
  private items: QueueElement<T>[] = [];

  enqueue(element: T, priority: number) {
    const queueElement = new QueueElement(element, priority);

    if (this.items.length === 0) {
      this.items.push(queueElement);
    } else {
      let added = false;

      // 자신보다 priority가 높은 요소를 찾아서 그 자리에 쏙 삽입
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > queueElement.priority) {
          this.items.splice(i, 0, queueElement); // 삽입
          added = true;
          break;
        }
      }

      // priority가 자신보다 높은 index가 없는 경우, 가장 끝에 삽입
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
    console.log(this.items.toString());
  }
}
