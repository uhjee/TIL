import React, { FC, useState } from 'react';
import Todo from './Todo';
import { TodoType } from './types';

const TODO_LIST: TodoType[] = [
  {
    id: 1,
    title: '첫 번째',
    content: '내용입니다. 11',
    isChecked: true,
  },
  {
    id: 2,
    title: '두 번째',
    content: '내용입니다. 22',
    isChecked: false,
  },
  {
    id: 3,
    title: '세 번째',
    content: '내용입니다. 33',
    isChecked: true,
  },
];

export const TodoList: FC = () => {
  const [todos, setTodos] = useState<TodoType[]>(TODO_LIST);

  const onChangeTodo = (newTodo: TodoType) => {
    const copied = [...todos];
    const foundIndex = copied.findIndex((i) => i.id === newTodo.id);
    if (foundIndex > -1) {
      copied[foundIndex] = newTodo;
      setTodos(copied);
    }
  };
  return (
    <ul>
      <Todo.Title> namespace 연습, 투두 타이틀 따로 써본다. </Todo.Title>
      {todos &&
        todos.map((todo, index) => (
          <Todo todo={todo} key={index} onChangeTodo={onChangeTodo}>
            <Todo.Title>{todo.title}</Todo.Title>
            <Todo.Content text={todo.content} />
            <div>ddd?</div>
          </Todo>
        ))}
    </ul>
  );
};
