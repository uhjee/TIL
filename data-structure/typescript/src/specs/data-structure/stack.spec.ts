import { describe, expect, it } from '@jest/globals';
import Stack from '../../data-structure/stack';

describe('Test for Class Stack', () => {
  beforeEach(() => {});

  describe('push()', () => {
    it('push한 파라미터의 개수 만큼 items의 길이가 추가되어야 한다. ', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', [1, 2, 3]);

      stack.push(4, 5, 6, 7);
      const items = Reflect.get(stack, 'items');
      expect(items.length).toBe(7);
    });
  });

  describe('pop()', () => {
    it('가장 마지막 데이터가 없을 경우, undefined를 반환해야 한다.', () => {
      const stack = new Stack();
      expect(stack.pop()).toBeUndefined();
    });

    it('items의 가장 마지막 데이터를 반환해야 한다.', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', ['happy', 'life', 'enjoy']);
      expect(stack.pop()).toEqual('enjoy');
    });

    it('성공적으로 값을 반환했을 경우, items의 개수가 하나 줄어들어야 한다.', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', ['happy', 'life', 'enjoy']);
      const items = Reflect.get(stack, 'items');
      stack.pop();
      expect(items.length).toBe(2);
    });
  });

  describe('peek()', () => {
    it('가장 마지막 데이터가 없을 경우, undefined를 반환해야 한다.', () => {
      const stack = new Stack();
      expect(stack.peek()).toBeUndefined();
    });

    it('items의 가장 마지막 데이터를 반환해야 한다.', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', ['happy', 'life', 'enjoy']);
      expect(stack.peek()).toEqual('enjoy');
    });
  });

  describe('isEmpty()', () => {
    it('items 가 비어있을 때, true를 반환해야 한다.', () => {
      const stack = new Stack();
      expect(stack.isEmpty()).toBe(true);
    });

    it('items가 비어있지 않을 때, false를 반환해야 한다.', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', [1, 2, 3, 4, 5]);
      expect(stack.isEmpty()).toBe(false);
    });
  });

  describe('size()', () => {
    it('number 타입을 반환해야 한다.', () => {
      const stack = new Stack();
      expect(typeof stack.size()).toEqual('number');
    });
    it('stack의 items에 데이터가 없는 경우, 0을 반환해야 한다', () => {
      const stack = new Stack();
      expect(stack.size()).toBe(0);
    });
    it('stack의 items 개수를 반환해야 한다', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', [1, 2, 3]);
      expect(stack.size()).toBe(3);
    });
  });

  describe('clear()', () => {
    it('호출 후 items의 길이가 0이 되어야 한다.', () => {
      const stack = new Stack();
      Reflect.set(stack, 'items', [1, 2, 3, 4, 5]);
      stack.clear();
      const items = Reflect.get(stack, 'items');
      expect(items.length).toBe(0);
    });
  });
});
