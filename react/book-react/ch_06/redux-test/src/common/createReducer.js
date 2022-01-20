import produce from 'immer';

export default function createReducer(initialState, handlerMap) {
  return function (state = initialState, action) {
    return produce(state, draft => {    // immer 의 produce() 사용: 새로운 객체 반환
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}
