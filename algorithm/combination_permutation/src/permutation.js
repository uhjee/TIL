/**
 * 순열의 배열을 반환
 *
 * @param   {[type]}  arr  [arr description]
 * @param   {[type]}  num  [num description]
 *
 * @return  {[type]}       [return description]
 */
const getPermutationArr = (arr, num) => {
  const results = [];
  if (num === 1) return arr.map(i => [i]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]; // 해당하는 fixed를 제외한 나머지 요소들의 배열
    const permutations = getPermutationArr(rest, num - 1);
    const attached = permutations.map(p => [fixed, ...p]);
    results.push(...attached);
  });

  return results;
};

/**
 * 순열의 문자열을 반환
 *
 * @param   {[type]}  str  [str description]
 * @param   {[type]}  num  [num description]
 *
 * @return  {[type]}       [return description]
 */
const getPermutationString = (str, num) => {
  const results = [];
  if (num === 1) return [...str]; // 1개씩 택할 때, 바로 모든 배열의 원소 return

  [...str].forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)].join(''); // 해당하는 fixed를 제외한 나머지 요소들의 배열
    const permutations = getPermutationString(rest, num - 1);
    const attached = permutations.map(p => [fixed, ...p].join(''));
    results.push(...attached);
  });

  return results;
};

module.exports = { getPermutationArr, getPermutationString };
