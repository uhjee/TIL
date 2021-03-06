import React from 'react';
import ReactDOM from 'react-dom';
import Style from './App.css';

import Icon from './icon.png';
import Json from './data.json';
import Text from './data.txt';

console.log({ Style }); // js 에서는 css 파일을 읽을 수 없기 때문에 에러 발생

function App() {
  return (
    <div className="container">
      <h3 className="title">webpack example</h3>
      <div>{`name: ${Json.name}, age: ${Json.age}`}</div>
      <div>{`text: ${Text}`}</div>
      <img src={Icon} alt="" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
