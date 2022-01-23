import { createStore, combineReducers, applyMiddleware } from 'redux';
import timelineReducer from '../timeline/state';
import friendReducer from '../friend/state';

import createSagaMiddleware from '@redux-saga/core';
import timelineSaga from '../timeline/state/saga';

const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer,
});

// saga middleware 생성
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// store 객체를 원하는 곳에서 가져다 사용할 수 있다.
export default store;

sagaMiddleware.run(timelineSaga);
