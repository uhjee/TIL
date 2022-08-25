export const sum = (a: number, b: number): number => a + b;

export const range = (from: number, to: number): number[] =>
  from < to ? [from, ...range(from + 1, to)] : [];

export const promiseTest = (value: string | null) =>
  new Promise((resolve, reject) => {
    if (value === null) reject('fail');

    setTimeout(() => {
      resolve(value);
    }, 3000);
  });