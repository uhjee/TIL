class App1 extends React.Component {
  state = {
    age: 20,
  };

  intervalId = null;

  constructor(props) {
    super(props);
    console.log('01.constructor', props);
  }

  render() {
    console.log('render');

    return (
      <div>
        <h2>예제 1</h2>
        <h2>
          Hello {this.props.name} :: {this.state.age}
        </h2>
      </div>
    );
  }

  // !deprecated
  // componentWillMount() {
  //   console.log('02.componentWillMount');
  // }

  static getDerivedStateFromProps(nextProps, nextState) {
    console.log('getDerivedStateFromProps', nextProps, nextState);
    return null;
  }

  componentDidMount() {
    console.log('04.componentDidMount');

    this.intervalId = setInterval(() => {
      // console.log('setInterval');
      this.setState(state => ({ ...state, age: this.state.age + 1 }));
    }, 1000);
  }

  // deprecated
  // componentWillReceiveProps(nextProps) {
  // console.log('componentWillReceiveProps', nextProps);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      'shouleComponentUpdate - return [boolean]',
      nextProps,
      nextState,
    );
    return true;
  }

  // !deprecated
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('componentWillUpdate', nextProps, nextState);
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

let i = 0;
class App2 extends React.Component {
  state = { list: [] };

  render() {
    return (
      <>
        <h2>예제 2</h2>
        <div
          id="list"
          style={{ height: 100, overflowY: 'scroll', padding: 0, margin: 0 }}
        >
          {this.state.list.map(i => {
            return <div key={`id_${i}`}>{i}</div>;
          })}
        </div>
      </>
    );
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        ...state,
        list: [...state.list, i++],
      }));
    }, 1000);
  }

  // ! 렌더 전후의 상탯값을 비교해 스크롤 최하단 고정
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.list.length === this.state.list.length) return null; // return 값이 저장할 snapshot 데이터

    const list = document.querySelector('#list'); // 직접 DOM 조작은 안되지만 일단 편의상 사용
    return { restHeight: list.scrollHeight - list.scrollTop };
  }

  // snapshot 활용
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
    if (snapshot === null) return;

    const list = document.querySelector('#list');
    list.scrollTop = list.scrollHeight - snapshot.restHeight;
  }
}

class App3 extends React.Component {
  state = {
    hasError: false,
  };
  render() {
    if (this.state.hasError) {
      return <div>예상치 못한 에러 발생</div>;
    }

    return <div>정상적인 경우</div>;
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
}

ReactDOM.render(<App1 name="uhjee" />, document.querySelector('#root1'));
ReactDOM.render(<App2 />, document.querySelector('#root2'));
ReactDOM.render(<App3 />, document.querySelector('#root3'));
