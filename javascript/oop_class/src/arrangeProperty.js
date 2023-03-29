const SYM = Symbol();

const obj = {
  name: 'jee',
  age: 21,
  address: '서울',
  [SYM]: 4,
};

// 프로퍼티 나열
for (const key in obj) {
  if (!Object.hasOwnProperty.call(obj, key)) {
    continue;
  }
  const element = obj[key];
  console.log(element);
}

Object.keys(obj).forEach((k) => console.log(k));
