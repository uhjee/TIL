const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    try {
      console.log('[req info ]------- : ', req.method, req.url);
      if (req.method === 'GET') {
        if (req.url === '/') {
          const data = await fs.readFile('./restFront.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/about') {
          const data = await fs.readFile('./about.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } else if (req.url === '/users') {
          res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
          });
          return res.end(JSON.stringify(users));
        }

        // 주소가 /도 /about /users 도 아닌 경우
        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (error) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Founded error 발생
        }
      } else if (req.method === 'POST') {
        switch (req.url) {
          case '/user':
            let body = '';
            // 요청의 body를 steam으로 형식으로 받음
            req.on('data', data => {
              body += data;
            });

            // 요청의 body를 다 받은 후에 실행됨
            return req.on('end', data => {
              console.log('POST 본문(body): ', body);
              const { name } = JSON.parse(body);
              const id = Date.now();
              users[id] = name;
              res.writeHead(201);
              res.end('등록 성공');
            });
          default:
            return;
        }
      } else if (req.method === 'PUT') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          let body = '';

          req.on('data', data => {
            body += data;
          });
          return req.on('end', () => {
            console.log('PUT 본문(body): ', body);
            users[key] = JSON.parse(body).name;
            return res.end(JSON.stringify(users[key]));
          });
        }
      } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2];
          delete users[key];
          return res.end(JSON.stringify(users));
        }
      }

      res.writeHead(404);
      return res.end('NOT FOUNDED!');
    } catch (error) {
      console.error(error);
      res.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end(error.message);
    }
  })
  .listen(8080, () => {
    console.log('8080 포트에서 써버 대기 중 !');
  });
