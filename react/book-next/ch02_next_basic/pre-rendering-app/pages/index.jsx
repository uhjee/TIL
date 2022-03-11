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
        <h2>step 02. param에 따라 동적으로 데이터 받아오기</h2>
        <Link href="/User02">
          <a>user02</a>
        </Link>
      </div>
    </div>
  );
};

export default index;
