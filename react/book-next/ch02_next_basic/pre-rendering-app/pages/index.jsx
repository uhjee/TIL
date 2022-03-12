import Link from 'next/link';

Link;
const index = () => {
  return (
    <div>
      <div>
        <h2>step 01</h2>
        <Link href="/User01">
          <a>user01</a>
        </Link>
      </div>
      <div>
        <h2>step 02. getServerSideProps</h2>
        <Link href="/User02">
          <a>user02</a>
        </Link>
      </div>
      <h2>step 03. getStaticProps</h2>
      <Link href="/static">
        <a>static data</a>
      </Link>
      <h2>step 04. getInitialProps</h2>
      <Link href="/User02">
        <a>getInitailProps</a>
      </Link>
    </div>
  );
};

export default index;
