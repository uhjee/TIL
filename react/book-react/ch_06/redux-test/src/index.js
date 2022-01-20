import React from 'react';
import ReactDOM from 'react-dom';
import TimelineMain from './timeline/container/TimelineMain';
import FriendMain from './friend/container/FriendMain';

import store from './common/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <FriendMain />
      <TimelineMain />
    </div>
  </Provider>,
  document.getElementById('root'),
);
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// import { createStore, combineReducers } from 'redux';
// import timelineReducer, {
//   addTimeline,
//   removeTimeline,
//   editTimeline,
//   increaseNextPage,
// } from './timeline/state';

// import friendReducer, {
//   addFriend,
//   removeFriend,
//   editFriend,
// } from './friend/state';

// // combineReducers 를 사용해 두 개의 reducer를 하나로 합치기
// const reducer = combineReducers({
//   timeline: timelineReducer,
//   friend: friendReducer,
// });

// // store 생성
// const store = createStore(reducer);

// // debugging 목적 :: 액션 처리가 끝날 때마다 상탯값 로그 출력
// store.subscribe(() => {
//   const state = store.getState();
//   console.log(state);
// });

// // timeline
// store.dispatch(addTimeline({ id: 1, desc: '코딩은 즐겁다.' }));
// store.dispatch(addTimeline({ id: 2, desc: '리덕스는 너무 좋다.' }));
// store.dispatch(increaseNextPage());
// store.dispatch(editTimeline({ id: 2, desc: '리덕스는 정말 좋다.' }));
// store.dispatch(removeTimeline({ id: 1, desc: '코딩은 즐겁다.' }));

// // friend
// store.dispatch(addFriend({ id: 1, name: '아이유' }));
// store.dispatch(addFriend({ id: 2, name: '손나은' }));
// store.dispatch(editFriend({ id: 2, name: '수지' }));
// store.dispatch(removeFriend({ id: 1, name: '아이유' }));
