import React, { createContext, useState } from 'react';

// context API 선언
const UserContext = createContext('');

function App() {
  const [username, setUsername] = useState('');
  return (
    <div>
      {/* // context 제공자 */}
      <UserContext.Provider value={username}>
        <div>상단 메뉴</div>
        <Profile />
        <div>하단 메뉴</div>
      </UserContext.Provider>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
    </div>
  );
}

// React.memo() 를 통해 중간 단계 컴포넌트가 렌더링되지 않도록 처리
const Profile = React.memo(() => {
  return (
    <div>
      <Greeting />
    </div>
  );
});

function Greeting() {
  return (
    // context 소비자
    <UserContext.Consumer>
      {username => <p>{`${username}님 안녕하세요`}</p>}
    </UserContext.Consumer>
  );
}

export default App;
