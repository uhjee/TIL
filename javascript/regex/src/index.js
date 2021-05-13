const string = `
aaakkkddfdfd@gmail.com
opuhe1596@gmail.com
www.google.com
How can i not love my life!
010-4442-5829
https://www.omdbapi.com/?apikey=33339dc9d&s=frozen
httpsssss://www.omdbapi.com/?apikey=3333dddd9dc9d&s=frozen
abbcccccddddd
fsdfa
575
http://www.omdbapi.com/?apikey=33339dc9d&s=frozen
The love is the greast in ma life.
하루를 세며 happy 돌아보던 길 위_위 on the road 에서...
console.log('happy');
`;

// 01. 메소드
//  - 정규식.test()
// const reg2 = /love/gi;
// const reg3 = /jee/gi;

// console.log(reg2.test(string));
// console.log(reg3.test(string));

//  - 문자열.match()
// console.log(string.match(/www/g));

//  - 문자열.replace()
// const otherStr = string.replace(/www/, 'aaaaaa');

// console.log(string);
// console.log(otherStr);

// 02. 패턴(표현)
//    - ^, $
// console.log(string.match(/d$/gm));
// console.log(string.match(/^[hH]/gm));

// console.log(string.match(/h..p/g));
// console.log(string.match(/love|life/g));
// console.log(string.match(/https?/g));
// console.log(string.match(/https*/g));
// console.log(string.match(/https+/g));

// console.log(string.match(/d{2}/g));
// console.log(string.match(/d{2,}/g));
// console.log(string.match(/d{2,4}/g));
// console.log(string.match(/d{5}/g));

// console.log(string.match(/\b\w{2,3}\b/gm));
// console.log(string.match(/[\d]+/g));
// console.log(string.match(/[\w]+/g)); // 한글
// console.log(string.match(/\bh\w+\b/g)); // h로 시작하는 단어
// console.log(string.match(/\b\d+\b/g)); // 숫자열

// const spaceWord = `  hello, my     name, is ...    `;

// console.log(spaceWord.replace(/\\s/g), '');

console.log(string.match(/.{1,}(?=\@)/g)); // @ 기준 앞의 문자 1개 이상 일치
console.log(string.match(/(?<=\@).+/g)); // @ 기준 뒤의 문자 1개 이상 일치
