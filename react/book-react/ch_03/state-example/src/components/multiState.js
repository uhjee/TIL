import React, { useState } from 'react';

export default function MultiState() {
  // 두 개의 상탯값을 하나의 객체로 관리
  const [state, setState] = useState({ name: '', age: 0 });

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>

      <input
        type="text"
        value={state.name}
        // setState는 덮어쓰기 때문에, 기존 데이터를 구조분해할당으로 복사
        onChange={e => setState({ ...state, name: e.target.value })}
      />
      <input
        type="text"
        value={state.age}
        onChange={e => setState({ ...state, age: e.target.value })}
      />
    </div>
  );
}