// functional component
// function Component(props) {
//   return (
//     <div>
//       <h1>{props.message} this is functional component. </h1>
//     </div>
//   );
// }

// class component
class Component extends React.Component {
  // state 선언 방법 1.
  // state = {
  //   count: 0,
  // };

  // state 선언 방법 2.
  constructor(props) {
    super(props);

    this.state = { count: 3 };
  }

  render() {
    return (
      <div>
        {/* this 를 적어줘야 한다. 인자로 props가 들어오는 것이 아니기 때문에 */}
        <h1>{this.props.message} this is class component </h1>
        <p>{this.state.count}</p>
      </div>
    );
  }

  // render 직후에 호출되는 life cycle
  componentDidMount() {
    setTimeout(() => {
      // this.state.count += 1; => 동작 안함 state 할당 이렇게 하면 안됌

      // state 세팅 방법 1
      // this.setState({
      //   // setState() 함수 호출
      //   count: this.state.count + 1,
      // });

      // state 세팅 방법 2
      this.setState(previousState => {
        const newState = { count: previousState.count + 10 };
        return newState;
      });
    }, 1000);
  }

  // ? 1. class - defaultProps 설정 방법 1
  static defaultProps = {
    message: '기본 값',
  };
}

// ? 2. functional, class 공통 default props 설정 방법
Component.defaultProps = {
  message: '기본 값?',
};

ReactDOM.render(
  // <Component message="this is props. not default. " />,
  <Component />,
  document.querySelector('#root'),
);
