/**
 * duck 패턴으로 작성
 */

import { TodoType } from '../types/todo';

//!  03. 액션 타입 정의
export const SET_TODO_LIST = 'todo/SET_TODO_LIST';

//!  02. 항상 모듈의 action 생성자들을 함수형태로 export
// 액션 생성자 정의
export const setTodo = (payload: TodoType[]) => {
  // console.log({ payload });
  return {
    type: SET_TODO_LIST,
    payload,
  };
};

export const todoActions = { setTodo };

interface TodoReduxState {
  todos: TodoType[];
}

//! 초기 값
const initialState: TodoReduxState = {
  todos: [],
};

//! 01. 항상 reducer() 란 이름의 함수를 export default
// Reducer()
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_TODO_LIST:
      // console.log(action);
      const newState = { ...state, todos: action.payload };
      return newState;

    default:
      return state;
  }
}
