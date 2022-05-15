import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlobalStyle from '../styles/GlobalStyle';

// AppProps 타입 : 컴포넌트의 props
const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* 글로벌 스타일 적용 */}
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default app;
