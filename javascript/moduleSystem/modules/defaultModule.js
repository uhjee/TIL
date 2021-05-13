const findKey = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value) || null;
};

const makeObjToArray = (obj) => {
  const result = [];
  Object.keys(obj).forEach((key) => {
    result.push({ [key]: obj[key] });
  });
  return result;
};

// 하나의 개체만 내보낼 경우 default 명시 - 중괄호 없어 가져다 쓸 수 있다.
export default {
  getUser: function () {
    return { name: 'jee', age: 31 };
  },
  animals: ['tiger', 'bird', 'snake', 'wolf'],
  findKey,
  makeObjToArray,
};
