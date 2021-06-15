type FuncString<T> = (x: T) => string;

export const f: FuncString<string> = <T>(x: T) => `f(${x})`;
export const g: FuncString<string> = <T>(x: T) => `g(${x})`;
export const h: FuncString<string> = <T>(x: T) => `h(${x})`;
