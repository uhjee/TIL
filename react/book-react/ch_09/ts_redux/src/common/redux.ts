import produce from 'immer';
import { Draft } from 'immer';

// 1. action 객체의 타입 (데이터가 없는 경우, 있는 경우)
interface TypedAction<T extends string> {
  type: T;
}
interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
  payload: P;
}

// 2. action 생성자 함수 타입 (overloading을 통해 데이터 유무 차이)
export function createAction<T extends string>(type: T): TypedAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): TypedPayloadAction<T, P>;

// @ts-ignore
export function createAction(type, payload?) {
  return payload !== undefined ? { type, payload } : { type };
}

// 3. reducer 생성 함수 타입(S: 상탯값 타입, T: 액션 타입, A는 모든 액션 객체의 유니온타입)
export function createReducer<S, T extends string, A extends TypedAction<T>>(
  initialState: S,
  handlerMap: {
    [key in T]: (state: Draft<S>, action: Extract<A, TypedAction<key>>) => void;
  },
) {
  return function (
    state: S = initialState,
    action: Extract<A, TypedAction<T>>,
  ) {
    return produce(state, (draft) => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}
