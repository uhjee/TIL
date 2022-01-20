/**
 * reducer 반환
 *
 * @param   {[type]}  reducers  [reducers description]
 * @return  {[type]}            [return description]
 */
export default function mergeReducers(reducers) {
  return function (state, action) {
    if (!state) {
      // 초기 상탯값을 계산 - 모든 reducer의 결과값을 합친다.
      return reducers.reduce((acc, r) => ({ ...acc, ...r(state, action) }), {});
    } else {
      let nextState = state;
      for (const r of reducers) {
        nextState = r(nextState, action);
      }
      return nextState;
    }
  };
}
