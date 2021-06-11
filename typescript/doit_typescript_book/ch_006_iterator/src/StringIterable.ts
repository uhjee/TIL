import { rangeGenerator } from './rangeGenerator';

export class StringIterable implements Iterable<string> {
  constructor(private strings: string[] = [], private currentIndex: number = 0) {}

  [Symbol.iterator](): Iterator<string> {
    const self = this;
    let currentIndex = self.currentIndex,
      length = self.strings.length;

    const iterator: Iterator<string> = {
      next(): { value: string | undefined; done: boolean } {
        const value = currentIndex < length ? self.strings[currentIndex++] : undefined;
        const done = value === undefined;
        return { value, done };
      },
    };
    return iterator;
  }
}
