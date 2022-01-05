// 00. 고전적으로 DOM 요소 제어
// console.log(React); // For create react component
// console.log(ReactDOM); // For connect react component with HTMLElement

// const root = document.querySelector('#root');
// const btn_plus = document.querySelector('#btn_plus');

// let i = 0;

// root.innerHTML = '<p>init : 0</p>';

// btn_plus.addEventListener('click', () => {
//   root.innerHTML = `<p>init : ${++i}</p>`;
// });

//--------------------------------------------------------------------------------

// // 01. 컴포넌트 개념
// const component = {
//   message: 'init',
//   count: 0,

//   render() {
//     return `<p>${this.message} : ${this.count}</p>`;
//   },
// };

// function render(rootElement, component) {
//   rootElement.innerHTML = component.render();
// }

// // 초기화
// render(document.querySelector('#root'), component);

// document.querySelector('#btn_plus').addEventListener('click', () => {
//   component.message = 'update';
//   component.count += 1;

//   render(document.querySelector('#root'), component); // 값이 변할 때마다 렌더링
// });

//--------------------------------------------------------------------------------

// 02. react 사용

// 컴포넌트 생성
const Component = props => {
  // return React Element
  return React.createElement('p', null, `${props.message}: ${props.count}`); // 태그, attribute, innertext
};

// 렌더링
ReactDOM.render(
  React.createElement(
    Component,
    {
      message: 'init',
      count: 0,
    },
    null,
  ),
  document.querySelector('#root'),
);

document.querySelector('#btn_plus').addEventListener('click', () => {
  ReactDOM.render(
    React.createElement(
      Component,
      {
        message: 'update',
        count: 10,
      },
      null,
    ),
    document.querySelector('#root'),
  );
});
