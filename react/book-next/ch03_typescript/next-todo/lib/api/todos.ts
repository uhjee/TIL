import axios from '.';
import { TodoType } from '../../types/todo';

/**
 * TodoList를 불러온다.
 *  axios.get() 는 제네릭을 통해 data 속성의 타입을 정해줄 수 있다.
 * @return  {TodoType[]}             [return description]
 */
export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');
