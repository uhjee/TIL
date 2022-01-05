/**
 *

React.cretaeElement(
  type, // 태그 이름 문자열 | 리액트 컴포넌트 |React.Fragment
  [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
  [...children] // 자식으로 넣어주는 요소들
)

*/

// ? 1. 태그 이름 문자열 type
// ReactDOM.render(
//   React.createElement('h1', null, `type 이 "태그 이름 문자열"`),
//   document.querySelector('#root'),
// );

// ? 2. 리액트 컴포넌트 type

// const Component = () => {
//   return React.createElement('p', null, `type이 'react 컴포넌트 입니다.'`);
// };

// ReactDOM.render(
//   React.createElement(Component, null, null),
//   document.querySelector('#root'),
// );

// ? 3. React.Fragment
// 가상의 element 요소

// ReactDOM.render(
//   React.createElement(
//     React.Fragment,
//     null,
//     `type이 "React Fragment" 입니다.`,
//     `type이 "React Fragment" 입니다.`,
//     `type이 "React Fragment" 입니다.`,
//   ),
//   document.querySelector('#root'),
// );

// ? 4. 복잡한 리액트 엘레먼트 모임
// 중첩 엘레먼트를 표현할 때, 굉장히 복잡해진다.

ReactDOM.render(
  React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      null,
      React.createElement('h1', null, '주제'),
      React.createElement(
        'ul',
        null,
        React.createElement('li', null, 'react'),
        React.createElement('li', null, 'vue'),
      ),
    ),
  ),
  document.querySelector('#root'),
);
