import React, { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const Title: FC<IProps> = ({ children }) => {
  return <div className="todo_title">{children}</div>;
};
