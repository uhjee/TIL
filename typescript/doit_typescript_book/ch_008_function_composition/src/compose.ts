import { f, g, h } from './f-g-h';
import { inc } from './high-order-func';

export const compose =
  <T, R>(...functions: readonly Function[]): Function =>
  (x: T): ((y: T) => R) => {
    const deepCopiedFunctions = [...functions];
    return deepCopiedFunctions.reverse().reduce((value, func) => func(value), x);
  };

const composedFGH = compose(h, g, f);
console.log(composedFGH);
console.log(composedFGH(1));

// inc 호출

const composed1 = compose(inc, inc, inc, inc, inc);
console.log(composed1(0));
