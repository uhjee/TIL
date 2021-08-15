import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Todo from './components/todo';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// ReactDOM.render(
//   <Todo title="리액트 공부하기" desc="실전 리액트 프로그래밍 읽기" />,
//   document.getElementById('root'),
// );
