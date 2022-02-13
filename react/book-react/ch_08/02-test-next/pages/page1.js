import Head from 'next/head';
import Link from 'next/link';

import Icon from '../static/icon1.png';
import { add } from '../src/util';

function Page1() {
  return (
    <div>
      <Link href="/page2">
        <a>page2로 이동</a>
      </Link>
      <p>This is home page</p>
      {/* 정적 파일 직접 import 후 사용- 캐싱 안됨 */}
      <img src={Icon} />

      <p>{`10 + 20 = ${add(10, 20)}`}</p>

      {/* Next 제공 Head 컴포넌트 사용 
          여러 개로 사용해도 이후 컴파일 시 하나로 합쳐짐
      */}
      <Head>
        <title>page1</title>
      </Head>
      <Head>
        <meta name="description" content="hello next" />
      </Head>

      {/* Next는 styled-jsx 패키지를 통해 css-in-js 방식 지원 
          선언된 style은 현 컴포넌트 내부에만 적용
      */}
      <style jsx>
        {`
          p {
            color: blue;
            font-size: 18pt;
          }
        `}
      </style>
    </div>
  );
}

export default Page1;
