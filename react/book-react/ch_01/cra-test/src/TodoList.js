import { div } from 'prelude-ls';
import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]); // 할일 목록을 관리할 상태값 정의

  const onClick = () => { // 클릭 이벤트 핸들러
    import('./Todo.js').then(({ Todo }) => { // 비동기로 동적 import(promise 반환)
      const position = todos.length + 1;
      const newTodo = <Todo key={position} title={`할 일 ${position}`} />; // 새 할 일 생성
      setTodos([...todos, newTodo]); // 세팅
    });
  };

  return (
    <div>
      <button onClick={onClick}>할 일 추가</button>
      {/* 상태값에 저장된 할 일 목록 출력 */}
      {todos} 
    </div>
  );
}
