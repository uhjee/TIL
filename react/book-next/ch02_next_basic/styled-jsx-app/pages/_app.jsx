const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      공통이냐?
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
