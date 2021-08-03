import logo from './logo.svg';
import './App.css';
import './TodoList';
import TodoList from './TodoList';

import './test.css';

function App() {
  return (
    <div className="App">
      <TodoList />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn react
        </a>
      </header>
    </div>
  );
}

export default App;

console.log(`NODE_ENV = ${process.env.NODE_ENV}`); // 전역 환경 변수 접근

console.log(`REACT_APP_DATA_API: ${process.env.REACT_APP_DATA_API}`);
console.log(`REACT_APP_DATA_API: ${process.env.REACT_APP_LOGIN_API}`);
