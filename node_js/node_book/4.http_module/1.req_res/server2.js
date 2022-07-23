const http = require('http');
const fs = require('fs').promises;

const server = http
  .createServer(async (req, res) => {
    try {
      // fs 으로 html 파일 불러오기
      const fileData = await fs.readFile('./server2.html');
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      throw new Error('에러다!');
    } catch (error) {
      console.error(error);
      res.writeHead(500, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(error.message);
    }
  })
  .listen(8080);

server.on('listening', () => {
  console.log(`8080포트에서 대기 중..`);
});
