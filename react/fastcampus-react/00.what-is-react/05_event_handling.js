// function Component() {
//   return (
//     <div>
//       <button
//         onClick={() => {
//           console.log('클릭되었다.');
//         }}
//       >
//         클릭
//       </button>
//     </div>
//   );
// }

class Component extends React.Component {
  state = {
    count: 0,
  };

  // constructor(props) {
  //   super(props);
  //   this.click = this.click.bind(this); // this binding
  // }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.click}>클릭</button>
      </div>
    );
  }

  // 자신의 this binding 하지 않는 arrow function 사용
  click = () => {
    return this.setState(state => ({ ...state, count: state.count + 1 }));
  };
}

ReactDOM.render(<Component />, document.querySelector('#root'));
