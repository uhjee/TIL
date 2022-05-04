import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* 글로벌 스타일 적용 */}
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default app;
