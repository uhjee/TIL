const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('허지행');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const inputRef = useRef();

  const onSubmitForm = e => {
    e.preventDefault();
    // 끝말잇기 로직
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue('');
      setResult('딩동댕');
      setHistory([...history, value]);
      inputRef.current.focus();
    } else {
      setResult('땡'), setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  console.log('rendering...');
  return (
    <>
      <h2>function component</h2>
      <div>시작어: {word}</div>
      <form onSubmit={onSubmitForm}>
        {/* for, class는 js에서 예약어 이기 때문에, htmlFor, className 으로 사용 */}
        <label htmlFor="wordInput">글자를 입력하세요.</label>
        <input
          id="wordInput"
          className="word-input"
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          type="text"
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
      <div>{history}</div>
    </>
  );
};

module.exports = WordRelay;
