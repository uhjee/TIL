/**
 *  파일에 TODO 데이터를 관리하는 함수 정의
 */

import { readFileSync, writeFileSync } from 'fs';
import { TodoType } from '../../types/todo';

/**
 * file styem으로 데이터를 가져온다.
 * @return  {TodoType[]}  [return description]
 */
const getList = (): TodoType[] => {
  const todosBuffer: Buffer = readFileSync('data/todos.json');
  const todosString = todosBuffer.toString();

  if (!todosString) return [];

  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
};

/**
 * 해당 ID 에 해당하는 데이터가 있는지 확인한다.
 * @param   {number}   id  [id description]
 * @return  {boolean}      [return description]
 */
const exist = ({ id }: { id: number }): boolean => {
  const todos = getList();
  const isExistTodo = todos.some(i => i.id === id);
  return isExistTodo;
};

/**
 * todo.json 데이터를 업데이트한다.
 *
 * @param   {TodoType[]}  todos  [todos description]
 * @return  {[]}                 [return description]
 */
const write = (todos: TodoType[]) => {
  writeFileSync('data/todos.json', JSON.stringify(todos));
};

export default {
  getList,
  exist,
  write,
};
