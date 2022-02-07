import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

// ReactDom.render(<App page="home" />, document.getElementById('root'));

// server로부터 전달된 초기 데이터
const initialData = window.__INITIAL_DATA__;

// SSR은 DOM 요소는 미리 서버가 만든 상태이기 때문에, 이벤트만 다시 걸어주는 hydrate 함수 사용
ReactDom.hydrate(
  <App page={initialData.page} />,
  document.getElementById('root'),
);
