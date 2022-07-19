const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '이 글이 입력된다고 합니다. 과연???')
  .then(() => {
    return fs.readFile('./writeme.txt');
  })
  .then(data => {
    console.log(data.toString());
  })
  .catch(e => {
    throw e;
  });
