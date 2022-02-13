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

### 8.2.3 SSR 렌더링 함수 사용해보기

- react는 SSR 을 위해 `renderToString` 함수 외에 `renderToNodeStream` 함수 제공

#### renderToString 함수

- 모든 렌더링 과정이 끝나야 문자열로된 결과값 반환

#### renderToNodeStream 함수

호출 즉시 node의 stream 객체 반환

렌더링 데이터를 빠르게 전달할 수 있다는 장점

페이지가 아무리 복잡하더라도 첫 번째 chunk가 준비되면 바로 전송 시작하기 때문

- node의 stream

  - 배열이나 문자열 같은 data collection

  - 크기가 큰 데이터를 다룰 때 유용

  - 데이터를 chunk 단위로 쪼개서 전달하기 때문에, 데이터가 완전히 준비되지 않아도 전송 시작 가능

  - stream을 사용해 크기가 큰 파일 읽어오기

    메모리를 효율적으로 사용할 뿐 아니라, 첫 번째 청크가 준비되면 바로 전송을 시작하기 때문에 빠름

    ```js
    app.get('/readFile', (req, res) => {
        const fileStream = fs.createReadStream('./big_file.zip'); // file을 읽기 위해 읽기 가능한 reable stream 객체 생성
        fileStream.pipe(res);	// node의 HTTP response 객체는 쓰기 가능한 writable steram 객체
        // 데이터는 reable stream 에서 writable stream으로 흐른다.
    })
    ```

  - 읽기 쓰기 가능한 steam : duplex stream

    - readble stream 과 writable stream  연결 역할

    ```js
    reabaleStream
    	.pipe(transformStream1)
    	.pipe(transformStream2)
    	.pipe(writableStream)
    ```

    

## 8.3 Next 초급

- cra는 CSR만 하는 반면, Next는 SSR에 특화된 프레임워크

### 8.3.1 Next 시작하기

- 모든 페이지 컴포넌트는 pages 폴더 및에 생성



#### Next의 번들 파일 분석

- 프로젝트 루트의 `.next` 디렉토리 하위에 번들파일이 생성됨

- `.next/static`
  - chunks : 여러 페이지에서 공통으로 사용하는 번들 파일
    - pages : 각 페이지의 번들 파일
  - runtime : webpack, next의 런타임과 관련된 번들 파일
- `./next/server/static` 
  - : 서버에서 사용하는 파일들
  - 하위의 파일들은 코드가 압축되어 있지 않다.
  - node_modules 디렉토리의 외부 모듈의 코드가 번들 파일에 포함되어 있지 않음
    - 어차피 서버에서 실행되는 코드이기 때문
  - pages
    - 정적 페이지는 미리 렌더링해 html 파일로 저장
    - `_document.js` 파일은 서버 측에서 HTML 요소를 추가하는 용도

SSR 요청 후 응답 파일들 

- _app.js : 모든 페이지의 최상단에서 실행되는 리액트 컴포넌트 코드
- framework.[해시값].js : Next 에서 사용하는 주요 패키지(react 등)의 코드
- [해시값].js : 여러 페이지에서 공통으로 사용하는 코드
- main-[해시값].js : 웹팩 런타임 코드

#### Next 기본 기능 사용하기

- 정적 파일 import
- HTML head 태그
- style 코드 작성

```jsx
import Head from 'next/head';

function Page1() {
  return (
    <div>
      <p>This is home page</p>
      {/* 정적 파일 직접 import 후 사용- 캐싱 안됨 */}
      <img src="/static/icon.png" />

      {/* Next 제공 Head 컴포넌트 사용 
          여러 개로 사용해도 이후 컴파일 시 하나로 합쳐짐
      */}

      <Head>
        <title>page1</title>
      </Head>
      <Head>
        <meta name="description" content="hello next" />
      </Head>

      {/* Next는 styled-jsx 패키지를 통해 css-in-js 방식 지원 
          선언된 style은 현 컴포넌트 내부에만 적용
      */}

      <style jsx>
        {`
          p {
            color: blue;
            font-size: 18pt;
          }
        `}
      </style>
    </div>
  );
}

export default Page1;
```

#### Next가 생성한 HTML 분석

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta charset="utf-8" />
    <title class="jsx-fe0073b77777a978">page1</title>

      Head 컴포넌트를 사용해 입력한 DOM 요소
    <meta
      name="description"
      content="hello next"
      class="jsx-fe0073b77777a978"
    />
    <meta name="next-head-count" content="4" />
    <noscript data-n-css=""></noscript>
    <script
      defer=""
      nomodule=""
      src="/_next/static/chunks/polyfills-5cd94c89d3acac5f.js"
    ></script>
	// ...
    <script
      src="/_next/static/jUPe9HMDDGC4vvNf41cWI/_middlewareManifest.js"
      defer=""
    ></script>
      
      style-jsx 문법으로 작성한 스타일 코드
    <style id="__jsx-fe0073b77777a978">
      p.jsx-fe0073b77777a978 {
        color: blue;
        font-size: 18pt;
      }
    </style>
  </head>
  <body>
    <div id="__next" data-reactroot="">
      <div class="jsx-fe0073b77777a978">
        <p class="jsx-fe0073b77777a978">This is home page</p>
        <img src="/static/icon.png" class="jsx-fe0073b77777a978" />
      </div>
    </div>
      
      서버에서 생성된 데이터
    <script id="__NEXT_DATA__" type="application/json">
      {
        "props": { "pageProps": {} },
        "page": "/page1",
        "query": {},
        "buildId": "jUPe9HMDDGC4vvNf41cWI",
        "nextExport": true,
        "autoExport": true,
        "isFallback": false,
        "scriptLoader": []
      }
    </script>
  </body>
</html>

```



### 8.3.2 웹팩 설정 변경하기

Next는 cra 와 달리 webpack 설정을 변경할 수 있음

- 정적파일은 프로젝트 루트의 static 이용
- 브라우저 캐싱 기능을 활용하기 위해서는, 파일의 내용이 변경되면 파일의 path도 변경되는게 좋음
- webpack의 file-loader로 이 기능 구현

next.config.js

```js
module.exports = {
  // webpack 설정을 변경하기 위한 함수
  webpack: config => {
    // module 에 file-loader 추가
    config.module.rules.push({
      test: /.(png|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // 쿼리 파라미터 부분에 해시 추가해 파일의 내용이 변경될 때마다 파일 경로가 변경되도록 처리
            name: '[path][name].[ext]?[hash]',
            // next는 static 폴더의 정적파일을 그대로 서비스하기 때문에 복사필요 X
            emitFile: false,
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
  // next version 10 이후로 Image component가 내장되어 있기 때문에... 별도 설정
  //  next@canary 설치 필요
  images: {
    disableStaticImages: true,
  },
};

```

 next version 10 부터는 Image 컴포넌트가 내장되어 있기 때문에, 아래 패키지 설치 필요

```sh
npm install next@canary
```

### 8.3.3 서버에서 생성된 데이터를 전달하기

- next 에서는 `getInitialProps` 라는 함수를 이용해 페이지 컴포넌트로 속성값을 전달
- 각 페이지의 `getInitialProps` 함수는 페이지 진입 직전에 호출
  - 사용자가 첫 페이지를 요청하면 `getInitialProps` 함수는 서버에서 호출
  - 이후 클라이언트 페이지 전환을 하면 `getInitialProps` 함수는 클라이언트에서 호출

pages/page2.js

```jsx
import { callApi } from '../src/api';

// getInitialProps 함수 정의 - 매개변수로 다양한 정보가 전달되지만 여기선 쿼리 파라미터만 사용
Page2.getInitialProps = async ({ query }) => {
  const text = query.text || 'none'; // 쿼리 파라미터로부터 text 변수 생성
  const data = await callApi(); // 데이터를 가져오기 위해 API 호출 - (서버 | 클라이언트)에서 호출
  return { text, data }; // getInitialProps 함수의  return 값은 페이지 컴포넌트의 props 값으로 전달
};

export default function Page2({ text, data }) {
  return (
    <div>
      <p>this is home page2</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
    </div>
  );
}
```

src/api.js

```js
export function callApi() {
  return Promise.resolve(123);
}
```

### 8.3.4 페이지 이동하기

- Next 는 페이지 이동을 위해 `Link` 컴포넌트와 `Router` 객체 제공

#### Link 컴포넌트를 이용해서 페이지 이동하기

pages/page1.js

```jsx
import Head from 'next/head';
import Link from 'next/link'; // Link 컴포넌트

import Icon from '../static/icon1.png';

function Page1() {
  return (
    <div>
      <Link href="/page2">
        <a>page2로 이동</a>
      </Link>
			// ...
    </div>
  );
}

export default Page1;
```



#### Router 개체를 이용해서 페이지 이동하기

pages/page2.js

```jsx
import { callApi } from '../src/api';
import Router from 'next/router';  // Router 객체 

// ...

export default function Page2({ text, data }) {
  return (
    <div>
      <button onClick={() => Router.push('/page1')}>page1로 이동</button>
      // ...
    </div>
  );
}
```

### 8.3.5 에러 페이지 구현하기

- 별도로 에러 페이지를 구현하지 않았다면, Next에서 제공하는 에러 페이지가 사용됨
- 직접 구현하기 위해서는 `pages` 디렉토리 하위에  `_error.js` 파일 작성

pages/_error.js

```jsx

// 에러 페이지도 getInitialProps 함수 사용 가능
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default function ErrorPage({ statusCode }) {
  return (
    <div>
      {statusCode === 404 && '페이지를 찾을 수 없습니다.'}
      {statusCode === 500 && '알 수 없는 에러가 발생했습니다.'}
      {!statusCode && '클라이언트에서 에러가 발생했습니다.'}
    </div>
  );
}
```

promotion 모드로 실행

```sh
npx next build && npx next start
```

---

## 8.4 넥스트 고급편

### 8.4.1 페이지 공통 기능 구현

- `pages/_app.js` 파일에서 구현

- `myApp` 컴포넌트는 페이지가 전환되는 경우에도 unmount되지 않는다.

- unmount 되지 않기 때문에, 전역 상탯값을 관리하는 것도 가능

- 페이지 전환되어도 메뉴 UI 유지

  ​	pages/_app.js

  ```jsx
  import Link from 'next/link';
  
  /**
   * 공통 메뉴 UI 반환
   *
   * @param   {ReactElement}  Component  렌더링하려는 페이지의 컴포넌트
   * @param   {object}  pageProps  해당 페이지의 getInitialProps 함수가 반환한 값
   *
   * @return  {[type]}             [return description]
   */
  export default function myApp({ Component, pageProps }) {
    return (
      <div>
        <Link href="/page1">
          <a>page1</a>
        </Link>
        <Link href="/page2?text=uhjee">
          <a>page2</a>
        </Link>
        {/* 페이지 컴포넌트 렌더링 */}
        <Component {...pageProps} />
      </div>
    );
  }
  
  ```

  

  ### 8.4.2 넥스트에서의 코드 분할

  - Next는 기본적으로 페이지 별로 번들 파일 생성
    - 동적 임포트 사용 시에는 해당 모듈의 코드는 별도의 파일로 분할
    - 여러 페이지에 공통적으로 사용되는 모듈도 별도의 파일로 분할

  #### 동적 임포트로 코드 분할하기

  pages/page2.js

  ```jsx
  import { callApi } from '../src/api';
  import Router from 'next/router';
  
  export default function Page2({ text, data }) {
    function onClick() {
      // Dynamic Import
      import('../src/sayHello').then(({ sayHello }) => console.log(sayHello()));
    }
  
    return (
      <div>
        <button onClick={onClick}>sayHello(dynamic import)</button>
      </div>
    );
  }
  ```

  - sayHello button 을 클릭하는 순간, sayHello.js 모듈이 담긴 js 파일이 전송되는 것 확인
  - .next/static/chunks 디렉토리 밑에 sayHello.js 모듈의 코드 포함하는 번들 파일 존재
  - .next/server 폴더 밑에 sayHello.js 모듈 코드 포함한 번들 파일 존재 => SSR 시 사용

#### getInitialProps 함수에서 동적 임포트 사용하기

getInitialProps 함수에서 사용된 동적 임포트는 어떻게 동작하는지 확인

```jsx
import { callApi } from '../src/api';
import Router from 'next/router';
import { add } from '../src/util';

Page2.getInitialProps = async ({ query }) => {
  // dynamic import
  const { sayHello } = await import('../src/sayHello');
  console.log(sayHello());
	// ...
};

export default function Page2({ text, data }) {

  return (
    <div>
      <p>{`10 + 20 = ${add(10, 20)}`}</p>
    </div>
  );
}
```

- url로 접근 시, 서버에서 getInitialProps 호출
- 이후 페이지 이동으로 접근 시, sayHello 가 담긴 번들 파일을 브라우저가 가져온다.
