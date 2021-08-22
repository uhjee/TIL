import React, { useRef, useEffect } from 'react';

//forwardRef 함수로 감싼다
const TextInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
      <button>저장</button>
    </div>
  );
});

const ForwardRef = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* 속성값으로 ref  객체 전달 */}
      <TextInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
};

export default ForwardRef;
