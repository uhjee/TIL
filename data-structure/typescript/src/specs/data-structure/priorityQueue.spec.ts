import PriorityQueue from '../../data-structure/priorityQueue';

class QueueElement<T> {
  element: T;
  priority: number;

  constructor(element: T, priority: number) {
    this.element = element;
    this.priority = priority;
  }
}
describe('Test for Class "Priority Queue"', () => {
  describe('enqueue()', () => {
    it('1,5 우선순의 요소를 가진 큐에 3 우선순위 요소를 enqueue하면, 두 번째 인덱스에 추가되어야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('joy', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      queue.enqueue('happiness', 3);
      const items = Reflect.get(queue, 'items');
      expect(items[1].element).toEqual('happiness');
      expect(items[1].priority).toEqual(3);
    });

    it('가장 큰 우선순위를 가진 요소를 enqueue하면, 가장 마지막 인덱스에 추가되어야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      queue.enqueue('joy', 6);
      const items = Reflect.get(queue, 'items');
      expect(items[items.length - 1].element).toEqual('joy');
      expect(items[items.length - 1].priority).toEqual(6);
    });

    it('삽입하려는 요소와 동일한 우선순위를 가진 요소가 존재한다면 해당 요소의 뒤에 삽입되어야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      queue.enqueue('joy', 1);
      const items = Reflect.get(queue, 'items');
      expect(items[1].element).toEqual('joy');
      expect(items[1].priority).toEqual(1);
    });
  });
  describe('dequeue()', () => {
    it('비어있는 items에 dequeue한 경우, undefined를 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      const dequeuedValue = queue.dequeue();
      expect(dequeuedValue).toBeUndefined();
    });
    it('dequeue하면, 첫 번째 인덱스의 데이터를 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      const { element } = queue.dequeue()!;
      expect(element).toEqual('sadness');
    });
    it('dequeue하면, items의 길이가 하나 줄어들어야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);
      queue.dequeue();
      const items = Reflect.get(queue, 'items');

      expect(items.length).toBe(1);
    });
  });
  describe('front()', () => {
    it('비어있는 items에 front()한 경우, undefined를 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      const frontValue = queue.front();
      expect(frontValue).toBeUndefined();
    });
    it('첫 번째 인덱스의 데이터를 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      const { element } = queue.front();
      expect(element).toEqual('sadness');
    });
    it('front() 호출 전 후의 길이는 변함이 없어야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      queue.front();
      const items = Reflect.get(queue, 'items');
      expect(items.length).toBe(2);
    });
  });
  describe('isEmpty()', () => {
    it('items 가 비어있을 때, true를 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      expect(queue.isEmpty()).toBe(true);
    });

    it('items가 비어있지 않을 때, false를 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);
      expect(queue.isEmpty()).toBe(false);
    });
  });
  describe('clear()', () => {
    it('호출 후 items의 길이가 0이 되어야 한다.', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);
      queue.clear();
      const items = Reflect.get(queue, 'items');
      expect(items.length).toBe(0);
    });
  });
  describe('size()', () => {
    it('number 타입을 반환해야 한다.', () => {
      const queue = new PriorityQueue();
      expect(typeof queue.size()).toEqual('number');
    });
    it('queue의 items에 데이터가 없는 경우, 0을 반환해야 한다', () => {
      const queue = new PriorityQueue();
      expect(queue.size()).toBe(0);
    });
    it('queue의 items 개수를 반환해야 한다', () => {
      const queue = new PriorityQueue();
      const queueEl1 = new QueueElement('sadness', 1);
      const queueEl2 = new QueueElement('happiness', 5);
      Reflect.set(queue, 'items', [queueEl1, queueEl2]);

      expect(queue.size()).toBe(2);
    });
  });
});
