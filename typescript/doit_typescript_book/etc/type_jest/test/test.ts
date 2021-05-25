// import { sum } from '../src/index';

// test('1 + 2 = 3?', () => {
//   expect(sum(1, 2)).toBe(3);
// });

describe('strictFunctionTypes', () => {
  test('test strict function types rules', () => {
    type A = { a: string };
    type B = { a: string; b: string };
    type B1 = { a: string; b: string | number }; // union type
    type C = { a: string; b: string; c: string };

    // * 공변(Convariance)
    // 관계 C <: B <: B1 <: A
    const a: A = { a: 'a' };
    const b: B = { a: 'a', b: 'b' };
    const b1: B1 = { a: 'a', b: 2 };
    const c: C = { a: 'a', b: 'b', c: 'c' };

    const a1: A = a; // self = self
    const a2: A = b; // self = sub
    const a4: A = b1;
    const a3: A = c; // self = subsub

    // const b1: B = a; // !! self = sup  : type error {a} 는 {a, b}가 될 수 없음
    const b2: B = b; // self = self
    // const b21: B = b1; // self = sub
    const b3: B = c; // self = sub

    // const c1: C = a; // !! self = sup  : type error {a} 는 {a, b, c} 가 될 수 없음
    // const c2: C = b; // !! self = sup  : type error {a, b} 는 {a, b, c} 가 될 수 없음
    const c3: C = c; // self = self

    // * 반공변(Contravariance) - strictFunctionTypes
    type FA = (p: A) => void;
    type FB = (p: B) => void;
    type FC = (p: C) => void;

    const fa: FA = (p) => {
      console.log(p.a);
    };
    const fb: FB = (p) => {
      console.log(p.a, p.b);
    };
    const fc: FC = (p) => {
      console.log(p.a, p.b, p.c);
    };

    const fa1: FA = fa;
    // const fa2: FA = fb; // ! {a} 만 처리하는 FA 에 {a, b}를 처리하는 FB 할당 불가
    // const fa3: FA = fc; // ! {a} 만 처리하는 FA 에 {a, b, c}를 처리하는 FB 할당 불가

    const fb1: FB = fa;
    const fb2: FB = fb;
    // const fb3: FB = fc; // ! {a, b} 만 처리하는 FA 에 {a, b, c}를 처리하는 FC 할당 불가

    const fc1: FC = fa;
    const fc2: FC = fb;
    const fc3: FC = fc;
  });
});
