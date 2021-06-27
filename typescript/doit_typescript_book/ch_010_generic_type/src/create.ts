export const create = <T>(type: { new (...args): T }, ...args): T => new type(...args);

class Point {
  constructor(public x: number, public y: number) {}
}
[
  //
  create(Date), // 2021-06-27T07:44:51.530Z
  create(Point, 0, 0), // Point { x: 0, y: 0 }
].forEach(s => console.log(s));
