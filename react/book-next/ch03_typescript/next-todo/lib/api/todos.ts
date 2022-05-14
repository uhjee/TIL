import axios from '.';
import { TodoType } from '../../types/todo';

/**
 * TodoList를 불러오는 API 요청
 *  axios.get() 는 제네릭을 통해 data 속성의 타입을 정해줄 수 있다.
 * @return  {TodoType[]}             [return description]
 */
export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');

/**
 * id에 해당하는 Todo 데이터를 업데이트하는 API 요청
 *
 * @param   {number}  id          [id description]
 * @return  {[type]}              [return description]
 */
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);
