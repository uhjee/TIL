/**
 * 조합을 배열 형태로 반환
 *
 * @param   {Array}  arr  [arr description]
 * @param   {Number}  num  [num description]
 *
 * @return  {Array}       [return description]
 */
const getCombinationArr = (arr, num) => {
  const results = [];
  if (num === 1) return arr.map(i => [i]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

  // for(let i = 0; i <arr.length ; i++){
  //   const rest = [...arr].slice(i + 1);
  //   const combinations = getCombinationArr(rest, num - 1);
  //   const attached = combinations.map((c) => [arr[i], ...c]);
  //   results.push(...attached)
  // }

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 배열들
    const combinations = getCombinationArr(rest, num - 1); // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map(c => [fixed, ...c]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached); // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
};

/**
 * 조합을 문자열로 받고 문자열로 반환
 *
 * @param   {[type]}  arr  [arr description]
 * @param   {[type]}  num  [num description]
 *
 * @return  {[type]}       [return description]
 */
const getCombinationString = (str, num) => {
  const results = [];
  if (num === 1) return [...str]; // 1개씩 택할 때, 바로 모든 배열의 원소 return

  [...str].forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1).join(''); // 해당하는 fixed를 제외한 나머지 배열들
    const combinations = getCombinationString(rest, num - 1); // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map(c => [fixed, ...c].join('')); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached); // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
};

module.exports = { getCombinationArr, getCombinationString };
