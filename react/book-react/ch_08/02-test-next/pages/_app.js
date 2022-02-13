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
