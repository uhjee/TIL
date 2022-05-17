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

---

## 7.3 Redux 사용하기

- TodoList 의 getTodos 로직

  - AS-IS

    - server : `getServerSideProps()` 에서 API로 Todolist 데이터를 받아 페이지에 props로 전달

  - TO-BE

    1. 서버 사이드에서 API로 받아온 Todolist를 Redux store에 저장

    2. 저장된 store를 client로 전달

​	pages/index.tsx

- `wrapper` 객체의 `getServerSideProps`로 감싸서 선언
- store의 dispatch() 사용
  - 파라미터로 액션 전달(액션 생성자 함수 호출)

```tsx
import { wrapper } from '../store';
import { todoActions } from '../store/todo';
// ...

// wrapper 객체로 감싸서 store 사용 가능
export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    try {
      const { data } = await getTodosAPI();

      // action 생성자 함수 호출(액션 반환)을 파라미터로 dispatch() 호출
      store.dispatch(todoActions.setTodo(data));
      return { props: { todos: data } };
    } catch (e) {
      console.log(e);

      return { props: { todos: [] } };
    }
  },
);

export default Index;

```

---

## 7.4 Redux Toolkit

### RTK

- Redux 앱을 만들기에 필수적인 package와 함수들 포함
- devtool 포함
- Redux의 다음 문제 해결을 목적
  1. 리덕스 저장소 구성이 매우 복잡
  2. 리덕스가 유용한 작업을 수행하기 위해서는 많은 패키지를 추가해야 가능
  3. 리덕스에는 상용구 코드가 많이 필요

### 설치

```sh
yarn add @reduxjs/toolkit
```

store/todo.ts

- createSlice 함수 사용
  - Slice 객체 반환
    - property: actions, reducer, getIntialState 등

```typescript
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
```

store/index.ts

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

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
Ï
```

