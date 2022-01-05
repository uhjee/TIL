// ReactDOM.render(
//   React.createElement(
//     'div',
//     null,
//     React.createElement(
//       'div',
//       null,
//       React.createElement('h1', null, '주제'),
//       React.createElement(
//         'ul',
//         null,
//         React.createElement('li', null, 'react'),
//         React.createElement('li', null, 'vue'),
//       ),
//     ),
//   ),
//   document.querySelector('#root'),
// );

/**

JSX

 * 우리가 작성한 어떤 코드(jsx)를 순수하게 실행할 수 있는 javascript 코드로 변환할 필요 -> babel 트랜스파일러
 * babel 이 jsx 문법을 이해해 js로 트랜스파일해준다.

- 가독성 완승
- babel 과 같은 트랜스파일 과정에서 문법적 오류 발견 가능
 */
const title = '주 제 jsx';

ReactDOM.render(
  <div>
    <div>
      <h1>{title}</h1>
      <ul>
        <li>React</li>
        <li>Vue</li>
      </ul>
    </div>
  </div>,
  document.querySelector('#root'),
);
