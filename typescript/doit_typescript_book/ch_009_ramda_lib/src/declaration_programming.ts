import * as R from 'ramda';

// ! 기존 명령형 코드 - '값' 으로 데이터를 다룸
const value = 1;
const newValue: number = R.inc(value);
console.log(newValue);

// ! 선언형 - '배열'로 데이터를 다룸
const newArray: number[] = R.pipe(R.map(R.inc))([value]);
console.log(newArray);

// ! tap() 사용 - 로직 앞 뒤로 콘솔찍기
const numbers: number[] = R.range(1, 9 + 1);

// incNumbers라는 1차함수 만들기
const incNumbers: Function = R.pipe(
  //
  R.tap((a) => console.log(`before inc: ${a}`)),
  R.map(R.inc),
  R.tap((a) => console.log(`after inc:  ${a}`)),
);

incNumbers(numbers);
