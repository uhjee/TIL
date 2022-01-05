/**
 * class component
 *
 * 현재는 function component로 많이 사용하지만, 이전에는 state, life cycle을 가질 수 없기 때문에 class component를 사용했었대
 */

// // 정의
// class ClassComponent extends React.Component {
//   // 메소드 오버라이딩 필수
//   render() {
//     // 무조건 react element 리턴해야함
//     return <div>Hello</div>;
//   }
// }

// // 사용
// ReactDOM.render(<ClassComponent />, document.querySelector('#root'));

/**
 * function component
 * React 에서 상속받을 필요 X
 */

// 정의 1 - function 키워드 사용
function FunctionComponent() {
  // 무조건 react element 리턴해야함
  return <div>Hello Function</div>;
}

// 정의2 - arrow function 사용
const FunctionComponent2 = () => <div>Hello Function</div>;

// 사용
ReactDOM.render(<FunctionComponent2 />, document.querySelector('#root'));
