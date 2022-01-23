import React, { useEffect, useReducer, useState } from 'react';
import store from '../../common/store';
import { getNextTimeline } from '../../common/mockData';
import { actions } from '../state';
import TimelineList from '../component/TimelineList';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function TimelineMain() {
  // const [, forceUpdate] = useReducer(v => v + 1, 0);

  // useEffect(() => {
  //   let prevTimelines = store.getState().timeline.timelines;

  //   // action이 처리될 때마다 화면을 다시 그리기 위해 subcribe 메소드 사용
  //   const unsubscribe = store.subscribe(() => {
  //     const timelines = store.getState().timeline.timelines;
  //     if (prevTimelines !== timelines) forceUpdate();

  //     prevTimelines = timelines;
  //   });
  //   return () => unsubscribe(); // unmount 시 이벤트 처리 함수 해제
  // }, []);
  const dispatch = useDispatch();
  const timelines = useSelector(state => state.timeline.timelines);
  const isLoading = useSelector(state => state.timeline.isLoading);
  const error = useSelector(state => state.timeline.error);
  const text = useSelector(state => state.timeline.text);
  const [currentText, setCurrentText] = useState('');

  function onAdd() {
    const timeline = getNextTimeline();
    dispatch(actions.addTimeline(timeline));
  }

  function onLike(e) {
    const id = Number(e.target.dataset.id);
    const timeline = timelines.find(i => i.id === id);
    dispatch(actions.requestLike(timeline));
  }

  function onChangeText(e) {
    const text = e.target.value;
    dispatch(actions.trySetText(text));
    setCurrentText(text);
  }
  console.log('TimelineMain render');
  // const timelines = store.getState().timeline.timelines;

  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <TimelineList timelines={timelines} onLike={onLike} />
      {!!isLoading && <p>전송 중...</p>}
      {!!error && <p>에러 발생: {error}</p>}
      <input type="text" value={currentText} onChange={onChangeText} />
      {!!text && <p>{text}</p>}
    </div>
  );
}
