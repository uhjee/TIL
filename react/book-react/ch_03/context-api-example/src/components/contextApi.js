import React, { createContext, useState } from 'react';

// context API 선언
const UserContext = createContext('');
const ThemeContext = createContext('dark');

function ContextApi() {
  const [username, setUsername] = useState('');
  return (
    <div>
      {/* // 중첩 context 제공자 */}
      <ThemeContext.Provider value="light">
        <UserContext.Provider value={username}>
          <div>상단 메뉴</div>
          <Profile />
          <div>하단 메뉴</div>
        </UserContext.Provider>
      </ThemeContext.Provider>
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
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {username => (
            <p
              style={{ color: theme === 'dark' ? 'gray' : 'green' }}
            >{`${username}님 안녕하세요`}</p>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

export default ContextApi;
