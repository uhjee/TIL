import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../types/todo';

// todo store의 타입
interface TodoReduxState {
  todos: TodoType[];
}

//! 초기 값
const initialState: TodoReduxState = {
  todos: [],
};

// createSlice 함수 호출 - 액션 및 reducer 선언 후 생성해줌 Slice 반환
// Slice 인터페이스는 actions, reducer, getInitailState 등을 속성으로 갖는다.
const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // payload를 갖는 Action 타입 - generic으로 payload 타입 지정
    setTodo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

// Action 맵 export
export const todoActions = { ...todo.actions };

export default todo;
