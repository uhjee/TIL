import { useEffect } from 'react';
import Header from '../components/Header';

const MyApp = ({ Component, pageProps }) => {
  console.log({ pageProps });
  useEffect(() => {
    throw Error();
  }, []);
  return (
    <>
      <Header />
      <Component {...pageProps} />
      {/* 전역 스타일  */}
      <style jsx global>
        {`
          body {
            margin: 0;
            font-family: Noto Sans, Noto Sans KR;
          }
        `}
      </style>
    </>
  );
};

export default MyApp;
