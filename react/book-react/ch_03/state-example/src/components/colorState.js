import React, { useState } from 'react';

import Title from './title';
import Modal from './modal';

export default function MyComponent() {
  // 1. 상탯값:  useState 훅을 사용해 상탯값 관리
  const [color, setColor] = useState('red');

  function onClick() {
    setColor(color === 'blue' ? 'red' : 'blue');
  }

  return (
    <div>
      {/* 2. 속성값: 자식 컴포넌트에게 props 로 데이터 전달 */}
      <Title title={'제목을 props로 전달해요'} />

      <button style={{ backgroundColor: color }} onClick={onClick}>
        like!
      </button>
      <div id="modal"></div>
    </div>
  );
}
