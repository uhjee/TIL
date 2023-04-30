import React, { FC, ReactElement, ReactNode } from 'react';
import { TodoType } from '../types';

interface ITitleProps {
  children: ReactNode;
}
export const Title: FC<ITitleProps> = ({ children }) => {
  return <div className="todo_title">{children}</div>;
};

interface IContentProps {
  text: string;
}
export const Content: FC<IContentProps> = ({ text }) => {
  return <div className="todo_content">{text}</div>;
};

interface IProps {
  children: ReactElement<IContentProps>[];
  onChangeTodo: (newTodo: TodoType) => void;
  todo: TodoType;
}
const Todo: FC<IProps> = ({ children, onChangeTodo, todo }) => {
  const onChangeChecked = () => {
    onChangeTodo({
      ...todo,
      isChecked: !todo.isChecked,
    });
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isChecked}
        onChange={onChangeChecked}
      />
      {children}
    </li>
  );
};

// typescript에서 Sub Component를 프로퍼티로 넣는 법
export default Object.assign(Todo, {
  Title,
  Content,
});
