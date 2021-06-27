export const pick = (obj, keys) =>
  keys.map(key => ({ [key]: obj[key] })).reduce((result, value) => ({ ...result, ...value }), {});

const obj = {
  name: 'Jane',
  age: 22,
  city: 'Seoul',
  country: 'Korea',
};

console.log(
  //
  pick(obj, ['name', 'age']), // { name: 'Jane', age: 22 }
  pick(obj, ['nae', 'agge']), // ! 엉뚱한 결과 반환 { name: 'Jane', agge: undefined }
);

export const pick1 = <T, K extends keyof T>(obj: T, keys: K[]) =>
  keys.map(key => ({ [key]: obj[key] })).reduce((result, value) => ({ ...result, ...value }), {});

const obj1 = {
  name: 'Jane',
  age: 22,
  city: 'Seoul',
  country: 'Korea',
};

console.log(
  //
  pick1(obj1, ['name', 'age']), // { name: 'Jane', age: 22 }
  // pick1(obj1, ['nae', 'agge']), // ! 엉뚱한 결과 반환 { name: 'Jane', agge: undefined }
);
