const C = require('./src/combination');
const P = require('./src/permutation');

const result = C.getCombinationArr([1, 2, 3, 4], 3);
// console.log(result.length);

const result2 = C.getCombinationString('1234', 3);
// console.log(result2.length);

const result3 = P.getPermutationArr([1, 2, 3, 4], 3);
// console.log(result3.length);

const result4 = P.getPermutationString('1234', 3);
// console.log(result4.length);


const f = (num) => {
	let result = 1;
	for(let i = num; i > 0; i--){
		result *= i
	}
	return result;
}
console.log(f(5));