const http = require('http');

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {
      // 쿠키 세팅
      'Set-Cookie': 'mycookie=test',
    });
    res.end('Hello Cookie');
  })
  .listen(8080, () => {
    console.log('8080 대기 중');
  });
