import React, { useState, useCallback } from 'react';

const INITIAL_TEXT = '안녕하세요.';

const FuncitonRef = () => {
  const [text, setText] = useState(INITIAL_TEXT);
  const [showText, setShowText] = useState(true);

  const setInitialText = useCallback(ref => ref && setText(INITIAL_TEXT), []);
  return (
    <div>
      {showText && (
        <input
          type="text"
          // ref  속성으로 입력한 함수는 해당 요소가 제거되거나, 생성될 대마다 호출
          // 생성 시: 해당 요소 참조 변수가 넘어옴
          // 삭제 시: null 값이 넘어옴
          ref={setInitialText}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}

      {/* showText의 상태에 따라 input 요소가 제거되거나 생성 */}
      <button onClick={() => setShowText(!showText)}>보이기 / 가리기</button>
    </div>
  );
};

export default FuncitonRef;
