import Queue from '../../data-structure/queue';

describe('Test for Class "Queue"', () => {
  describe('enqueue()', () => {
    it('요소를 하나 enqueue하면, 가장 마지막 인덱스에 추가되어야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', ['sadness', 'blue']);
      queue.enqueue('happiness');
      const items = Reflect.get(queue, 'items');
      expect(items[items.length - 1]).toEqual('happiness');
    });
  });
  describe('dequeue()', () => {
    it('비어있는 items에 dequeue한 경우, undefined를 반환해야 한다.', () => {
      const queue = new Queue();
      const dequeuedValue = queue.dequeue();
      expect(dequeuedValue).toBeUndefined();
    });
    it('dequeue하면, 첫 번째 인덱스의 데이터를 반환해야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', ['sadness', 'blue']);
      const dequeuedValue = queue.dequeue();
      expect(dequeuedValue).toEqual('sadness');
    });
    it('dequeue하면, items의 길이가 하나 줄어들어야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', ['sadness', 'blue']);
      queue.dequeue();
      const items = Reflect.get(queue, 'items');

      expect(items.length).toBe(1);
    });
  });
  describe('front()', () => {
    it('비어있는 items에 front()한 경우, undefined를 반환해야 한다.', () => {
      const queue = new Queue();
      const frontValue = queue.front();
      expect(frontValue).toBeUndefined();
    });
    it('첫 번째 인덱스의 데이터를 반환해야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', ['sadness', 'blue']);
      const frontValue = queue.front();
      expect(frontValue).toEqual('sadness');
    });
    it('front() 호출 전 후의 길이는 변함이 없어야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', ['sadness', 'blue']);
      queue.front();
      const items = Reflect.get(queue, 'items');
      expect(items.length).toBe(2);
    });
  });
  describe('isEmpty()', () => {
    it('items 가 비어있을 때, true를 반환해야 한다.', () => {
      const queue = new Queue();
      expect(queue.isEmpty()).toBe(true);
    });

    it('items가 비어있지 않을 때, false를 반환해야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', [1, 2, 3, 4, 5]);
      expect(queue.isEmpty()).toBe(false);
    });
  });
  describe('clear()', () => {
    it('호출 후 items의 길이가 0이 되어야 한다.', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', [1, 2, 3, 4, 5]);
      queue.clear();
      const items = Reflect.get(queue, 'items');
      expect(items.length).toBe(0);
    });
  });
  describe('size()', () => {
    it('number 타입을 반환해야 한다.', () => {
      const queue = new Queue();
      expect(typeof queue.size()).toEqual('number');
    });
    it('stack의 items에 데이터가 없는 경우, 0을 반환해야 한다', () => {
      const queue = new Queue();
      expect(queue.size()).toBe(0);
    });
    it('stack의 items 개수를 반환해야 한다', () => {
      const queue = new Queue();
      Reflect.set(queue, 'items', [1, 2, 3]);
      expect(queue.size()).toBe(3);
    });
  });
});
