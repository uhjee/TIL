const buffer = Buffer.from('저를 버퍼로 바꿔주세요.');
console.log('buffer: ', buffer);
console.log('length: ', buffer.length); // 버퍼의 크기

const array = [
  Buffer.from('행복1 '),
  Buffer.from('행복2 '),
  Buffer.from('행복3'),
];
const buffer2 = Buffer.concat(array);
console.log('buffer2.toString(): ', buffer2.toString());

const buffer3 = Buffer.alloc(9);
console.log('buffer3: ', buffer3);
