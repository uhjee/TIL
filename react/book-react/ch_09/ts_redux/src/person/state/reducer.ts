import { ActionType, actions } from './action';
import { createReducer } from '../../common/redux';

// interface로 상탯값의 타입 정의
export interface StatePerson {
  name: string;
  age: number;
}

// 초기 상탯값 정의
const INITIAL_STATE = {
  name: 'empty',
  age: 0,
};

// ReturnType 내장 타입 이용해 모든 액션 객체의 타입을 유니온 타입으로 만듦
type Action = ReturnType<typeof actions[keyof typeof actions]>;

// 세 번째 제네릭: 모든 액션 객체의 유니온 타입 입력
export default createReducer<StatePerson, ActionType, Action>(INITIAL_STATE, {
  // typescript는 action.payload 가 SetName 액션 객체의 데이터라는 것을 알고 있음
  [ActionType.SetName]: (state, action) => (state.name = action.payload.name),
  [ActionType.SetAge]: (state, action) => (state.age = action.payload.age),
});
