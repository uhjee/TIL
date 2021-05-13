export default {
  // store 객체를 인자로 받기 때문에, state, getters, mutations 모두 접근 가능
  [Constant.ADD_TODO]: (store, payload) => {
    console.log(`###### add Todo!!!`);
    // state에 영향을 미치므로 commit()
    store.commit(Constant.ADD_TODO, payload);
  },

  // ES6의 구조분해 할당을 사용한 인자
  [Constant.DELETE_TODO]: ({
    store,
    commit
  }, payload) => {
    console.log(`###### delete Todo!!!`);
    commit(Constant.DELETE_TODO, payload);
  },
  [Constant.DONE_TOGGLE]: (store, payload) => {
    console.log(`###### done toggle!!!`);
    store.commit(Constant.DONE_TOGGLE, payload);
  }
}
