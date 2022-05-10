import { NextPage } from 'next';
import React from 'react';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';

// dummy datas
const todos: TodoType[] = [
  {
    id: 1,
    text: '책을 읽자',
    color: 'red',
    checked: false,
  },
  {
    id: 2,
    text: '피자를 먹자',
    color: 'yellow',
    checked: false,
  },
  {
    id: 3,
    text: '산책을 하자',
    color: 'blue',
    checked: true,
  },
  {
    id: 4,
    text: '똑바로 누워서 자자',
    color: 'orange',
    checked: true,
  },
  {
    id: 5,
    text: '골반 교정을 하자',
    color: 'navy',
    checked: false,
  },
  {
    id: 6,
    text: '쓰레기는 쓰레기통에 버리자',
    color: 'green',
    checked: false,
  },
];

const Index: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default Index;
