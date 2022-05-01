import Header from '../components/Header';

const MyApp = ({ Component, pageProps }) => {
  console.log({ pageProps });
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default MyApp;
