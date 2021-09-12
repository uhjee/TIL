const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '허지행',
    value: '',
    result: '',
    history: [],
  };

  // 화살표 함수로 만들어야 this 바인딩이 꼬이지 않는다.
  onSubmitForm = e => {
    e.preventDefault();
    // 끝말잇기 로직
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
        history: [...this.state.history, this.state.value],
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = e => {
    this.setState({ value: e.target.value });
  };

  input;
  onRefInput = c => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>시작어: {this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          {/* value, onChange는 세트... 같이 사용하자 */}
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
            type="text"
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
        <div>{this.state.history}</div>
      </>
    );
  }
}

module.exports = WordRelay;
