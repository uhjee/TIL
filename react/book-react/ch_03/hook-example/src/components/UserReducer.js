import React from 'react';

// 리덕스나 리듀서와 같은 방식으로 작성한 리듀서 함수
const INITIAL_STATE = { name: 'empty', age: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
};

// const API로 하위 컴포넌트에게 이벤트 전달
export const ProfileDispatch = React.createContext(null);

const Profile = () => {
  // useReducer 의 매개변수 (리듀서, 초기 상탯값)
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <h2>useReducer</h2>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.value}
        onChange={e =>
          dispatch({ type: 'setName', name: e.currentTarget.value })
        }
      />
      <input
        type="number"
        value={state.age}
        onChange={e => dispatch({ type: 'setAge', age: e.currentTarget.value })}
      />
      <ProfileDispatch.Provider value={dispatch}>
        <GrandChild></GrandChild>
      </ProfileDispatch.Provider>
    </div>
  );
};

const GrandChild = () => {
  // useContext로 전달받은 dispath 사용 가능
  const profileDispatch = React.useContext(ProfileDispatch);

  return <h4>자식의 자식</h4>;
};

export default Profile;
