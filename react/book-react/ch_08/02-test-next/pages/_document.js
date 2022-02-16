import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * Next 내장 _document.js 가 아닌 직접 구현하는 _document.js
 */
// Next에 내장된 Document 상속
export default class MyDocument extends Document {
  // 내장 getInitialProps 함수에서는 styled-jsx 의 스타일 코드 추출
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // styled-components 의 스타일 코드 추출
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()} // 추출한 스타일 코드 반환값에 추가
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
