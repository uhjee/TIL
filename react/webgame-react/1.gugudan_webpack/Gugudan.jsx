const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
  const randomNum = Math.ceil(Math.random() * 9);

  // useState : 상태값 정의, 비동기로 동작(setState를 모아서 렌더링 한 번만 하기 위해)
  const [first, setFirst] = useState(randomNum);
  const [second, setSecond] = useState(randomNum);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  // useRef 선언
  const inputRef = useRef(null); // 매개변수는 초깃값

  const onSubmitHandler = e => {
    e.preventDefault();
    if (parseInt(value, 10) === first * second) {
      setResult(`정답 ${value}`);
      setFirst(randomNum);
      setSecond(randomNum);
      setValue('');
    } else {
      setResult(`땡 ${value}`);
      setValue('');

      //inputRef 사용
      inputRef.current.focus();
    }
  };

  const onChangeHandler = e => {
    setValue(e.target.value);
  };

  console.log('렌더링...');
  return (
    <>
      <h2>Function Component</h2>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="number"
          value={value}
          onChange={onChangeHandler}
          ref={inputRef}
        />
        {/*아래 두개는 html과 js에서 혼동하기 때문에 아래 이름으로 대체해 사용 */}
        <button className="lala" htmlFor="">
          입력
        </button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = Gugudan;
