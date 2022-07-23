const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

/**
 * string 형태의 cookies를 파싱해 object 형태로 반환
 * @param   {string}  cookie  [cookie description]
 * @return  {object}          [return description]
 */
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http
  .createServer(async (req, res) => {
    // cookie 파싱
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);

      const expires = new Date();

      // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);

      // set session
      const uniqueInt = Date.now();
      session[uniqueInt] = {
        name,
        expires,
      };
      res.writeHead(302, {
        Location: '/',
        // cookie에는 한글과 줄바꿈 등이 입력되면 안된다.
        'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      return res.end();
      // cookie에 session이 존재하고, 만료기간이 지나지 않았다면
    } else if (
      cookies.session &&
      session[cookies.session].expires > new Date()
    ) {
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      return res.end(`${session[cookies.session].name}님 안녕하세요.`);
    } else {
      try {
        const data = await fs.readFile('./cookie2.html');
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
        });
        return res.end(data);
      } catch (error) {
        res.writeHead(500, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        res.end(error.message);
      }
    }
  })
  .listen(8080, () => {
    console.log('8080 포트 대기 중');
  });
