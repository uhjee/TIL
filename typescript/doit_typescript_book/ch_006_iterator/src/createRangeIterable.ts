// iterable: 반복기 제공자 iterator 객체를 반환하는 함수
export const createRangeIterable = (from: number, to: number) => {
  let currentValue = from
  // iterator 객체 (반복기)
  //  - 1. next 메소드 가져야함
  //  - 2. next 메소드는 value, done 을 가진 객체를 리턴해야함
  return {
    next() {
      const value = currentValue < to ? currentValue++ : undefined
      const done = value === undefined
      return { value, done }
    },
  }
}

// 값이 필요한 시점보다 이전에 한번에 미리 생성해둠 (메모리 효율성에서 떨어짐)
export const range = (from: number, to: number) => (from < to ? [from, ...range(from + 1, to)] : [])

export class RangeIterable {
  constructor(public from: number, public to: number) {}

  [Symbol.iterator]() {
    const self = this
    let currentValue = self.from
    return {
      next() {
        const value = currentValue < self.to ? currentValue++ : undefined
        const done = value === undefined
        return { value, done }
      },
    }
  }
}
