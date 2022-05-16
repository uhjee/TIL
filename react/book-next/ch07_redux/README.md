# 07. Redux

상태 관리를 위한 라이브러리

## 7.2 리덕스에 필요한 개념

### Action : { type: string }

- 상태 변화에 대해 알려주는 순수 javascript 객체

### Reducer

```typescript
(state, action) => nextState
```

- 상태와 액션을 가지고 함수를 실행하는 역할
- 액션에 대한 함수 정의 -> 함수를 실행해 상태 업데이트

### Dispatch(action: Action)

- 액션을 실행시키는 역할
- 액션을 인자로 받음
- 흐름
  1. `dispatch(action)`
  2. `reducer(prevState, action)`

### 7.2.1 Redux 세가지 원칙

1. 전체 상태값을 **단일 저장소** 내의 트리에 저장
2. 상태는 **읽기 전용** (불변 객체)
3. 상태값은 **순수함수**에 의해서만 변경되어야 함

### redux 환경

```sh
yarn add redux react-redux next-redux-wrapper redux-devtools-extension
yarn add @types/react-redux -D
```

### ducks 패턴

- 파일을 구조 중심이 아닌 기능(module) 중심으로 나누는 것
- 규칙
  1. 항상 `reducer()` 란 이름의 함수를 `export default`
  2. 항상 모듈의 action 생성자들을 함수 형태로 `export`
  3. 항상 `npm-module-or-app/reducer/ACTION_TYPE` 형태의 action 타입을 가져야 함
  4. 경우에 따라 `action`의 `type` 속성은 UPPER_SNAKE_CASE로 export

store/todo.ts

```typescript
/**
 * duck 패턴으로 작성
 */

import { TodoType } from '../types/todo';

//!  03. 액션 타입 정의
export const SET_TODO_LIST = 'todo/SET_TODO_LIST';

//!  02. 항상 모듈의 action 생성자들을 함수형태로 export
// 액션 생성자 정의
export const setTodo = (payload: TodoType[]) => {
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
      const newState = { ...state, todos: action.payload };
      return newState;

    default:
      return state;
  }
}

```

store/index.ts

```typescript
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

// App 컴포넌트에서 wrapper로 사용하기 위해 wrapper
export const wrapper = createWrapper(initStore);

```

