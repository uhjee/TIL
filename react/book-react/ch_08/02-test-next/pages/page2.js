import { callApi } from '../src/api';
import Router from 'next/router';

// getInitialProps 함수 정의 - 매개변수로 다양한 정보가 전달되지만 여기선 쿼리 파라미터만 사용
Page2.getInitialProps = async ({ query }) => {
  throw new Error('exception in getInitialProps');
  // const text = query.text || 'none'; // 쿼리 파라미터로부터 text 변수 생성
  // const data = await callApi(); // 데이터를 가져오기 위해 API 호출 - (서버 | 클라이언트)에서 호출
  // return { text, data }; // getInitialProps 함수의  return 값은 페이지 컴포넌트의 props 값으로 전달
};

export default function Page2({ text, data }) {
  return (
    <div>
      <button onClick={() => Router.push('/page1')}>page1로 이동</button>
      <p>this is home page2</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
    </div>
  );
}
