import React from 'react';

// 두 번째 객체로 ref 객체가 넘어온다.
function Profile(props, ref) {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);

  // ref 객체와 부모 컴포넌트에서 접근 가능한 함수
  React.useImperativeHandle(ref, () => ({
    addAge: value => setAge(age + value),
    getNameLength: () => name.length,
  }));
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
    </div>
  );
}

// 부모 객체에서 직접 처리하기 위해 forwardRef 함수로 호출
export default React.forwardRef(Profile);

// ! 부모 컴포넌트에서 자식 컴포넌트 함수 호출하기
function Parent() {
  const profileRef = React.useRef();
  const onClick = () => {
    if (profileRef.current) {
      console.log(`current name length: ${profileRef.current.getNameLength()}`);
      profileRef.current.addAge(5);
    }
  };

  return (
    <div>
      {/* 컴포넌트 속성으로 ref 객체 전달 */}
      <Profile ref={profileRef} />
      <button onClick={onClick}>add age 5</button>
    </div>
  )
}
