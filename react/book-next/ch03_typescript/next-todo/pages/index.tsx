import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import { getTodosAPI } from '../lib/api/todos';

interface IProps {
  todos: TodoType[];
}

const Index: NextPage<IProps> = ({ todos }) => {
  // console.log(process.env.NEXT_PUBLIC_API_URL, 'SERVER');
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // 미리 만들어 놓은 axios Instance 사용
    const { data } = await getTodosAPI();
    // console.log(process.env, 'SERVER');

    return { props: { todos: data } };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default Index;
