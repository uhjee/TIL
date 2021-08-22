import React, { useEffect, useRef } from 'react';

// 하위 컴포넌트
// 전달받은 ref 객체를 DOM 요소로 연결
function TextInput({ inputRef }) {
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button>저장</button>
    </div>
  );
}

// 상위 컴포넌트
const ComponentRef = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* 속성값으로 ref  객체 전달 */}
      <TextInput inputRef={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
};

export default ComponentRef;
