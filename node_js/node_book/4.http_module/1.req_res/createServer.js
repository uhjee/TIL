const http = require('http');

const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.write('<h1>Heelo Server!</h1>');
    res.end('<p>Hello Server p 태그</p>');
  })
  .listen(8080);

server.on('listening', () => {
  console.log(`8080포트에서 대기 중..`);
});

server.on('error', error => {
  console.error(error);
});
