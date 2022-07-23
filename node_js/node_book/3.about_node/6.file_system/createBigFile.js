const fs = require('fs');

const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10000000; i++) {
  file.write('엄청나게 큰 파일을 만들어 볼 것입니다. 각오해주세요.');
}

file.end();
