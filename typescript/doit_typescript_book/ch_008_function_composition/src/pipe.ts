import { f, g, h } from './f-g-h';

export const pipe =
  <T, R>(...functions: readonly Function[]): Function =>
  (x: T): ((t: T) => R) =>
    functions.reduce((value, func) => func(value), x);

const pipedFGH = pipe(f, g, h);

console.log(pipedFGH(1));
