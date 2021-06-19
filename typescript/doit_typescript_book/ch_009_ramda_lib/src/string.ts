import * as R from 'ramda';

// ! type 선언
type StringToStringFunc = (string) => string;

// * trim
console.log(R.trim('\t hello         \n'));

// * toLower, toUpper
console.log(
  //
  R.toLower('HELLO, lolLOLELO'),
  R.toUpper('hellohello?'),
);

// * split(구분자)(문자열)
const words: string[] = R.split(' ')('hello my name is jee jee jee');
console.log(words);

// * join(구분자)(문자열)
console.log(R.join('_')(words));

// * toCamelCase
const toCamelCase = (delim: string): StringToStringFunc => {
  const makeFirstToCapital = (word: string) => {
    const characters = word.split('');
    return characters.map((c, index) => (index === 0 ? c.toUpperCase() : c)).join('');
  };

  const indexedMap = R.addIndex(R.map);
  return R.pipe(
    R.trim,
    R.split(delim),
    R.map(R.toLower),
    indexedMap((value: string, index: number) =>
      index > 0
        ? //
          makeFirstToCapital(value)
        : value,
    ),
    // R.join(''),
  ) as StringToStringFunc;
};

console.log(toCamelCase(' ')('fuck the word'));
