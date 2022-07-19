const fs = require('fs').promises;

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }

  // console.log(data);
  // console.log(data.toString());
});

// promise
fs.readFile('./readme.txt')
  .then(data => {
    console.log(data);
    console.log(data.toString());
  })
  .catch(e => {
    throw e;
  });
