# 8. 서버사이드 렌더링 SSR & Next.js

#### SSR; Server Side Rendering

- 서버에서 react 코드를 실행해서 렌더링하는 것
- 필요성
  - SEO (Search Engine Optimization) 검색 엔진 최적화
  - 빠른 첫 페이지 렌더링

## 8.1 서버사이드 렌더링 초급

리액트의 SSR 시, 필요한 기능들

- react에서 제공하는 renderToString, hydrate 함수 사용
- server에서 생성된 데이터를 client로 전달하는 방법
- styled-components 로 작성된 스타일이 SSR 시 처리되는 과정
- 서버용 번들 파일을 만드는 방법

### 8.1.2 SSR 함수 사용하기

react 에서는 SSR을 위해 다음 네 개의 함수 제공

- renderToString : 최초 렌더링 이후에도 계속 상태변화에 따라 화면 갱신
- renderToNodeStream : 최초 렌더링 이후에도 계속 상태변화에 따라 화면 갱신
- renderToStaticMarkup : 정적 페이지 렌더링
- renderToStaticNodeStream : 정적 페이지 렌더링

필요 패키지 설치

```sh
npm install express @babel/cli @babel/plugin-transform-modules-commonjs
```

- `express`: 웹서버 띄우기 위해 사용
- `@babel/cli`: 서버에서 사용될 js 파일을 컴파일할 때 사용
- `@babel/plugin-transform-modules-commonjs` : 서버 node 환경에서 js 실행 시, ESM -> commonJS 변경을 위함

template/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>test-ssr</title>
    <script type="text/javascript">
      window.__INITIAL_DATA__ = __DATA_FROM_SERVER__;
    </script>

    __STYLE_FROM_SERVER__
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```



server.js

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
// react-dom 패키지의 server 디렌토리 하위에 서버에서 사용하는 기능
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import { ServerStyleSheet } from 'styled-components';

// express 객체인 app 변수를 사용해, 미들웨어와 url 경로 설정
const app = express();

// webpack 빌드 후 생성되는 index.html 파일의 내용을 가져온다.
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8',
);

// 정적파일 연결
app.use('/dist', express.static('dist'));

// 브라우저가 자동으로 요청하는 favicon.ico 파일이 아래 요청을 타지 않도록
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parsedUrl = url.parse(req.url, true); // 문자열 주소값을 구조체로 변환
  const page = parsedUrl.pathname ? parsedUrl.pathname.substring(1) : 'home'; // 'pathname' 앞의 / 를 삭제해 page 변수 만들기

  const sheet = new ServerStyleSheet(); // style 추출하는데 사용되는 객체 생성

  const renderString = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags(); // 스타일 정보추출
  const initialData = { page };
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)) // 문자열을 초기 데이터로 대체
    .replace('__STYLE_FROM_SERVER__', styles); // 추출된 스타일 코드 HTML 삽입
  res.send(result);
});
app.listen(3000);
```



### 8.1.4 스타일 적용

- 아래 두 가지 방법으로 스타일 작업을 한다면, 별도의 작업 필요(server에는 DOM이 없기 떄문)

  - css-module

  - css-in-js

```sh
npm install styled-components
```

- 스타일은 적용되나, 브라우저가 DOM 요소 구성 후, js 파일을 읽을 때, 스타일이 씌워지는 구조이기 때문에 느리고, 브라우저에서 js를 허용하지 않으면 스타일이 적용되지 않는다.

#### SSR에 스타일 적용하기

- server.js에 `__STYLE_FROM_SERVER__` 설정

### 8.1.5 이미지 모듈 적용하기



---

## 8.2 서버사이드 렌더링 고급편

### 8.2.1 페이지 미리 렌더링하기

#### 화면의 일부를 클라이언트에서만 렌더링하기

- 정적인 페이지는 데이터 API 요청 후, 세팅하는 부분을 제외한 나머지 html, css 요소에 대해서 미리 렌더링해놓는다.
- 응답에 맞추어 Front Server에서 반환
- 이후 데이터는 API 호출에 따라 부분 렌더링

### 8.2.2 SSR 캐싱하기

- 데이터에 의존적인 페이지는 정적 페이지를 미리 렌더링하는 방식 사용 X
- 데이터가 자주 변하지 않는 페이지라면 서버사이드 렌더링 결과를 캐싱해 활용할 수 있다.

#### lru-cache

- 제한된 메모리 안에 캐싱 데이터를 저장하기 위해 지울 데이터를 결정하는 알고리즘 지원 패키지
- 최대 캐시 개수를 초과하면 **LRU(least recently used)** 알고리즘에 따라 가장 오랫동안 사용되지 않은 캐시를 제거

