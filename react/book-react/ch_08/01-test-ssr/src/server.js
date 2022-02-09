import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
// react-dom 패키지의 server 디렌토리 하위에 서버에서 사용하는 기능
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import { ServerStyleSheet } from 'styled-components';

// 미리 렌더링한 페이지 활용
import { renderPage, prerenderPages } from './common';

// caching
import lruCache from 'lru-cache';

// express 객체인 app 변수를 사용해, 미들웨어와 url 경로 설정
const app = express();

// // webpack 빌드 후 생성되는 index.html 파일의 내용을 가져온다.
// const html = fs.readFileSync(
//   path.resolve(__dirname, '../dist/index.html'),
//   'utf8',
// );

// caching
const ssrCache = new lruCache({
  max: 100, // 최대  100개 페이지
  maxAge: 1000 * 60, // 60sec
});

// 미리 렌더링한 페이지 활용 :: prerender.js 파일 실행 시, 미리 렌더링해 놓은 페이지를 객체에 저장
const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8',
  );
  prerenderHtml[page] = pageHtml;
}

// 정적파일 연결
app.use('/dist', express.static('dist'));

// 브라우저가 자동으로 요청하는 favicon.ico 파일이 아래 요청을 타지 않도록
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parsedUrl = url.parse(req.url, true); // 문자열 주소값을 구조체로 변환

  // caching
  const cacheKey = parsedUrl.path;

  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }

  const page = parsedUrl.pathname ? parsedUrl.pathname.substring(1) : 'home'; // 'pathname' 앞의 / 를 삭제해 page 변수 만들기

  // const sheet = new ServerStyleSheet(); // style 추출하는데 사용되는 객체 생성

  // const renderString = renderToString(sheet.collectStyles(<App page={page} />));
  // const styles = sheet.getStyleTags(); // 스타일 정보추출

  const initialData = { page };

  // 미리 렌더링한 페이지 활용 :: 미리 렌더링된 페이지가 아닌 경우에만 새로 렌더링
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[page]
    : renderPage(page);

  // const result = html
  //   .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
  //   .replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)) // 문자열을 초기 데이터로 대체
  //   .replace('__STYLE_FROM_SERVER__', styles); // 추출된 스타일 코드 HTML 삽입

  // 미리 렌더링한 페이지 활용 :: 데이터 초기화
  const result = pageHtml.replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData),
  );

  // caching
  ssrCache.set(cacheKey, result);

  res.send(result);
});
app.listen(3000);
