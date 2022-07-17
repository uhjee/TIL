const { even, odd } = require('./var');
const checkOddAOrEven = require('./func');

const checkStringOddOrEven = str => {
  return str.length % 2 ? odd : even;
};

console.log(checkOddAOrEven(10));
console.log(checkStringOddOrEven('111'));
