// 2차 고차 함수 - 해제되지 않는 클로저
const makeNames = (): (() => string) => {
  const names = ['jack', 'jane', 'smith'];
  let index = 0;
  return (): string => {
    if (index === names.length) index = 0; // 원형 리스트 circular list 처럼 동작 => 클로저 해제 안됨
    return names[index++];
  };
};

export const range = (
  //
  to: number,
  from: number = 0,
): number[] => (from < to ? [from, ...range(to, from + 1)] : []);

const makeName: () => string = makeNames();
console.log(range(10).map((i) => makeName()));
console.log([1, 2, 3, 4, 5, 6].map((n) => makeName()));
