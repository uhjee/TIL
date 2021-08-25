import React from 'react';

const Profile = () => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);

  // ! useCallback
  const onSave = React.useCallback(() => saveToServer(name, age), [name, age]);

  return (
    <div>
      <h3>useCallback</h3>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit
        // 현재 컴포넌트가 렌더링될 때마다 자식 컴포넌트의 속성(onSave)으로 새로운 함수가 입력
        // onSave={() => saveToServer(name, age)}

        // useCallback 사용
        onSave={onSave}
        setName={setName}
        setAge={setAge}
      ></UserEdit>
    </div>
  );
};

// 연습용 자식 컴포넌트
const UserEdit = ({ onSave, setName, setAge }) => {
  return (
    <div>
      <input
        type="text"
        onChange={e => setName(e.currentTarget.value)}
        placeholder="name"
      />
      <input
        type="number"
        onChange={e => setAge(e.currentTarget.value)}
        placeholder="age"
      />
      <button onClick={() => onSave()}>save</button>
    </div>
  );
};

// 연습용 api
const saveToServer = (name, age) => {
  setTimeout(() => {
    console.log('server success');
    return true;
  }, 1000);
};

export default Profile;
