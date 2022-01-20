import React, { useEffect, useReducer } from 'react';
import store from '../../common/store';
import { getNextTimeline } from '../../common/mockData';
import { addTimeline } from '../state';
import TimelineList from '../component/TimelineList';

export default function TimelineMain() {
  const [, forceUpdate] = useReducer(v => v + 1, 0);

  useEffect(() => {
    let prevTimelines = store.getState().timeline.timelines;

    // action이 처리될 때마다 화면을 다시 그리기 위해 subcribe 메소드 사용
    const unsubscribe = store.subscribe(() => {
      const timelines = store.getState().timeline.timelines;
      if (prevTimelines !== timelines) forceUpdate();

      prevTimelines = timelines;
    });
    return () => unsubscribe(); // unmount 시 이벤트 처리 함수 해제
  }, []);

  function onAdd() {
    const timeline = getNextTimeline();
    store.dispatch(addTimeline(timeline));
  }

  console.log('TimelineMain render');
  const timelines = store.getState().timeline.timelines;

  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <TimelineList timelines={timelines} />
    </div>
  );
}
