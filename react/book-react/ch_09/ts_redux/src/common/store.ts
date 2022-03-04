import { createStore } from 'redux';
import { combineReducers } from 'redux';
import person, { StatePerson } from '../person/state/reducer';
// import product, { StateProduct } from '../product/state/reducer';

/**
 * TODO:
 * product 폴더 밑에 있는 파일의 코드는 독자의 숙제로 남겨 두겠다.
 * product / component / Product.tsx 파일에서는 mapDispatchToProps 함수를 작성해 보자.
 * 그리고 product / state / action.ts 파일에서는 payload가 없는 액션 생성자 함수를 작성해 보자.
 */

// 모든 리듀서의 상탯값 타입을 모은다.
export interface ReduxState {
  person: StatePerson;
  // product: StateProduct;
}

// 제네릭으로 ReduxState
const reducer = combineReducers<ReduxState>({
  person,
  // product,
});

export const store = createStore(reducer);
