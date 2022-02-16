const express = require('express');
const next = require('next');

const url = require('url');
const lruCache = require('lru-cache'); // SSR 결과를 캐싱하기 위해 패키지 이용

// 최대 100개까지 항목 저장, 각 항목은 60초 동안 저장
const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const port = 3000;

// 개발모드와 프로덕션 모드 구분
const dev = process.env.NODE_ENV !== 'production';

// 넥스트 실행을 위해 필요한 객체와 함수 생성
const app = next({ dev });
const handle = app.getRequestHandler();

// 넥스트의 준비 과정이 끝나면 입력된 함수 실행
app.prepare().then(() => {
  const server = express();

  // 리다이렉트
  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`);
  });

  server.get(/^\/page[1-9]/, (req, res) => {
    return renderAndCache(req, res);
  });

  server.get('*', (req, res) => {
    return handle(req, res); // 나머지 요청 handle 함수가 처리
  });

  // 사용자 요청을 처리하기 위해 대기
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

const fs = require('fs');

const prerenderList = [
  { name: 'page1', path: '/page1' },
  { name: 'page2-hello', path: '/page2?text=hello' },
  { name: 'page2-world', path: '/page2?text=world' },
];

const prerenderCache = {};

// next export 는 production 모드에서만 사용
// out 폴더에 있는 미리 렌더링된 HTML 파일을 읽어서 prerenderCache에 저장
if (!dev) {
  for (const info of prerenderList) {
    const { name, path } = info;
    const html = fs.readFileSync(`./out/${name}.html`, 'utf8');
    prerenderCache[path] = html;
  }
}
console.log(prerenderCache);

// SSR caching 기능 개발
async function renderAndCache(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const cacheKey = parsedUrl.path; // query parameter 가포함된 경로를 키로 사용
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }

  if (prerenderCache.hasOwnProperty(cacheKey)) {
    console.log('미리 렌더링한 HTML 사용');
    res.send(prerenderCache[cacheKey]);
    return;
  }

  try {
    const { query, pathname } = parsedUrl;
    // cache가 없으면, 넥스트의 renderToHTML 메소드 호출
    const html = await app.renderToHTML(req, res, pathname, query);
    // 결과 커밋
    if (res.statusCode === 200) {
      ssrCache.set(cacheKey, html);
    }
    res.send(html);
  } catch (err) {
    app.renderToError(err, req, res, pathname, query);
  }
}
