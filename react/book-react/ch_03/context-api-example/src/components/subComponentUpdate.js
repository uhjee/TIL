import React from 'react';

const UserContext = React.createContext({ username: '', helloCount: 0 });
const SetUserContext = React.createContext(() => {});

export default function SubComponentUpdate() {
  const [user, setUser] = React.useState({ username: 'mike', helloCount: 0 });
  return (
    <div>
      {/* // context 데이터를 수정할 수 있는 함수 전달 */}
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <Profile />
        </UserContext.Provider>
      </SetUserContext.Provider>
    </div>
  );
}

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
    <SetUserContext.Consumer>
      {setUser => (
        <UserContext.Consumer>
          {({ username, helloCount }) => (
            <React.Fragment>
              <p>{`${username}님 안녕하세요`}</p>
              <p>{`인사 횟수: ${helloCount}`}</p>
              <button
                onClick={() =>
                  setUser({ username, helloCount: helloCount + 1 })
                }
              >
                인사하기
              </button>
            </React.Fragment>
          )}
        </UserContext.Consumer>
      )}
    </SetUserContext.Consumer>
  );
}