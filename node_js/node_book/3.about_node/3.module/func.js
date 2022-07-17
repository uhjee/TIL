const { odd, even } = require('./var');

const checkOddAOrEven = num => {
  return num % 2 === 1 ? odd : even;
};

module.exports = checkOddAOrEven;
