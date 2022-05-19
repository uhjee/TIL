import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';

import { Action, combineReducers } from 'redux';
import todo from './todo';

const rootReducer = combineReducers({
  todo: todo.reducer,
});

interface MyAction extends Action {
  [key: string]: any;
}

const reducer = (state: any, action: MyAction) => {
  // const reducer = (state: any, action: MyAction) => {
  // Hydrate: 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

// 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  // configureStore 로 store 설정
  return configureStore({
    reducer,
    devTools: true, // devtool option on
  });
};

export const wrapper = createWrapper(initStore);

// 타입 지원하는 useSelector로 커스텀 하기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// declare module 'react-redux' {
//   interface DefaultRootState extends RootState {}
// }
