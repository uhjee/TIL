import React, { useRef, useEffect } from 'react';

export default function Ref00() {
  // ref 생성
  const inputRef = useRef();

  // 부수효과 함수 : 마운트 끝나고 호출
  useEffect(() => {
    // 특정 요소 focusing
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* ref 할당 */}
      <input type="text" ref={inputRef} />
      <button>저장</button>
    </div>
  );
}
