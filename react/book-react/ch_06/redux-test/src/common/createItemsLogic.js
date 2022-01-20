import createReducer from './createReducer';

/**
 * 배열에 대한 공통로직
 *
 * @param   {[type]}  name  [name description]
 *
 * @return  {[type]}        [return description]
 */
export default function createItemsLogic(name) {
  /** ----------------------------ACTION---------------------------- */
  // action type 프로퍼티 상수로 선언 (식별성을 위해 앞에 friend/ 작성)
  const ADD = `${name}/ADD`;
  const REMOVE = `${name}/REMOVE`;
  const EDIT = `${name}/EDIT`;

  // action의 생성자 함수 정의
  const add = item => ({ type: ADD, item });
  const remove = item => ({ type: REMOVE, item });
  const edit = item => ({ type: EDIT, item });

  /** ----------------------------REDUCER---------------------------- */
  /**
   * reducer를 생성해 반환한다.
   *
   * @param   {[object]}  INITIAL_STATE  [INITIAL_STATE description]
   * @param   {[object]}  ACTION Handler Map
   * @return  {[function]}    Reducer     [return description]
   */
  const reducer = createReducer(
    { [name]: [] },
    {
      [ADD]: (state, action) => state[name].push(action.item),
      [REMOVE]: (state, action) => {
        const index = state[name].findIndex(item => item.id === action.item.id);
        state[name].splice(index, 1);
      },
      [EDIT]: (state, action) => {
        const index = state[name].findIndex(item => item.id === action.item.id);
        if (index > -1) {
          state[name][index] = action.item;
        }
      },
    },
  );
  return { add, remove, edit, reducer };
}
