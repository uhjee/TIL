import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import todo from './todo';

// reducer 를 모듈 별로 관리하는 경우 하나로 병합
const rootReducer = combineReducers({
  todo,
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
    return nextState;
  }
  return rootReducer(state, action);
};

// * 스토의 타입
// ReturnType<Type> :: utilType,  함수 type의 반환 타입으로 구성된 타입 생성
export type RootState = ReturnType<typeof rootReducer>;

// * 미들웨어 적용을 위한 스토어 enhancer
// middleware: action이 reducer에서 처리되기 전에 지정된 작업들
const bindMiddleware = (middleware: any) => {
  // devtool 사용을 위한 미들웨어
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// 스토어 객체 생성 -> deprecated 됨. `configureStore` 쓰라네..
const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

// 컴포넌트에서 wrapper로 사용하기 위해 wrapping
export const wrapper = createWrapper(initStore);
