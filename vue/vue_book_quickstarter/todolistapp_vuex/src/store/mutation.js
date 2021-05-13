import Constant from '../constant';

export default {
  //   첫 번째 인자는 상태, 두 번째 인자는 변이에서 필요로하는 데이터
  [Constant.ADD_TODO]: (state, payload) => {
    if (payload.todo !== "") {
      state.todolist.push({
        todo: payload.todo,
        done: false,
      });
    }
  },
  [Constant.DONE_TOGGLE]: (state, payload) => {
    state.todolist[payload.index].done = !state.todolist[payload.index].done;
  },
  [Constant.DELETE_TODO]: (state, payload) => {
    state.todolist.splice(payload.index, 1);
  },
}
