import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import { getTodosAPI } from '../lib/api/todos';
import { wrapper } from '../store';
import { todoActions } from '../store/todo';

interface IProps {
  todos: TodoType[];
}

const Index: NextPage<IProps> = ({ todos }) => {
  // console.log(process.env.NEXT_PUBLIC_API_URL, 'SERVER');
  return <TodoList todos={todos} />;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     // 미리 만들어 놓은 axios Instance 사용
//     const { data } = await getTodosAPI();
//     // console.log(process.env, 'SERVER');

//     return { props: { todos: data } };
//   } catch (e) {
//     console.log(e);
//     return { props: {} };
//   }
// };

// wrapper 객체로 감싸서 store 사용 가능
export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    try {
      const { data } = await getTodosAPI();

      // action 생성자 함수 호출(액션 반환)을 파라미터로 dispatch() 호출
      store.dispatch(todoActions.setTodo(data));
      return { props: {} };
    } catch (e) {
      console.log(e);

      return { props: {} };
    }
  },
);

export default Index;
