import React from 'react';

const Profile = () => {
  const [age, setAge] = React.useState(20);
  // 이전 상태값을 저장하기 위한 용도로 useRef 사용
  const prevAgeRef = React.useRef(20);

  // age가 변경되면, 해당 값을 prefAgeRef에 저장
  React.useEffect(() => {
    prevAgeRef.current = age;
  }, [age]);

  // 이전 상태값 이용
  const prevAge = prevAgeRef.current;
  const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger';

  return (
    <div>
      <p>{`age ${age} is ${text} then age ${prevAge}`}</p>
      <button
        onClick={() => {
          const age = Math.floor(Math.random() * 50 + 1);
          // age가 변경되고 다시 렌더링할 때, prevAge는 age의 이전 상탯값을 나타낸다.
          setAge(age);
        }}
      >나이 변경</button>
    </div>
  );
};

export default Profile;
