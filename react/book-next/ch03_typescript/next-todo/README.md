# 03. Typescript

typescript + next : TodoList

## 3.1. Environment

next 환경

```sh
npm init -y
npm i next react react-dom
npm i -D eslint
```

TS 환경

```sh
npm i -D typescript @types/react @types/node
```

eslint

```sh
npm i -D eslint
npx eslint --init
```

---

## 3.3 TS + Next page 만들기

### NextPage Type

- pages 폴더 내에서 사용 하는 컴포넌트들의 타입
- react 컴포넌트의 확장 - `getInitailProps` 함수를 갖고 있음

---

# 04. Styled Component

- CSS-in-JS 의 대표적인 라이브러리
- styled-jsx 와 유사하지만, 더 많은 기능이 있는 라이브러리

예제

https://github.com/vercel/next.js/tree/canary/examples/with-styled-components/pages

## 4.1. Evironment

```sh
npm i styled-components
npm i @types/styled-components -D
```

### 4.1.1 styled-component 로 SSR 지원하기

- Document 를 확장 -> SSR 과정에 `<head>` 에 스타일을 세팅하는 흐름

### babelrc

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}

```



#### _document.tsx

```tsx
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
```



### 4.1.2 styled-component로 글로벌 스타일 적용

style/GlobalStyle.ts

```typescript
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;
```



pages/_app.tsx

```tsx
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default app;
```



### browser 기본 style reset

```sh
npm i styled-reset
```

style/GlobalStyle.ts

```typescript
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
/* 모든 스타일 초기화 */
  ${reset}
  * {
    box-sizing: border-box;
   }
`;

export default GlobalStyle;
```

## 4.2 font 적용

pages/_document.tsx

```tsx
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	// ...

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

```

style/GlobalStyle.ts

- styled-component에서 제공하는 css 함수 사용해 변수처럼 사용 가능

```typescript
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

// styled-componet의 css 함수 사용 - 변수로 할당 가능
const globalStyle = css`
  /* 모든 스타일 초기화 */
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
```

