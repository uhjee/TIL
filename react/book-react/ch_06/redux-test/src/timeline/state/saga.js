// redux-saga 에서 부수효과를 발생시킬 때 사용하는 함수
import { all, call, put, take, fork, debounce } from 'redux-saga/effects';
import { actions, types } from '.';
import { callApiLike } from '../../common/api';

/**
 * REQUEST_LIKE 액션을 처리하는 제네레이터 함수 - 사가 함수
 * 제네레이터 객체(next, done 프로퍼티 보유) 반환
 * 사가 미들웨어에서 호출하며 로직 실행
 *
 * @param   {[type]}  action  [action description]
 *
 * @return  {[type]}          [return description]
 */
export function* fetchData(action) {
  while (true) {
    const { timeline } = yield take(types.REQUEST_LIKE); // take: 액션객체 가져온다
    yield put(actions.setLoading(true)); // put : 새로운 액션 발생 -> store.dispatch 호출
    yield put(actions.addLike(timeline.id, 1));
    yield put(actions.setError(''));
    try {
      yield call(callApiLike); // 입력된 함수를 대신 호출(해당 함수가 Promise 객체를 반환하면 resolve 까지 기다림)
    } catch (error) {
      yield put(actions.setError(error));
      yield put(actions.addLike(timeline.id, -1));
    }
    yield put(actions.setLoading(false));
  }
}

export function* trySetText(action) {
  const { text } = action;
  yield put(actions.setText(text));
}

// 여러 개의 사가 함수를 모아놓은 함수
export default function* watcher() {
  yield all([fork(fetchData), debounce(500, types.TRY_SET_TEXT, trySetText)]);
}
