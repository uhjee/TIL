import Vue from "vue";
import Vuex from "vuex";
// import Constant from "../constant";
import state from './state'
import mutation from './mutation'
import action from './action'

// vuex를 전역에서 사용할 수 있도록 등록
Vue.use(Vuex);

// 모든 컴포넌트에서 this.$store 로 접근 가능
const store = new Vuex.Store({
  state,
  mutation,
  action


  // // 상  태
  // state: {
  //   todolist: [{
  //       todo: "영화보기",
  //       done: false,
  //     },
  //     {
  //       todo: "주말 산책",
  //       done: true,
  //     },
  //     {
  //       todo: "자바 공부",
  //       done: false,
  //     },
  //     {
  //       todo: "야구 보기",
  //       done: false,
  //     },
  //   ],
  // },
  // // 변  이: 상태에 영향을 미치는 것 (동기처리)
  // mutations: {
  //   //   첫 번째 인자는 상태, 두 번째 인자는 변이에서 필요로하는 데이터
  //   [Constant.ADD_TODO]: (state, payload) => {
  //     if (payload.todo !== "") {
  //       state.todolist.push({
  //         todo: payload.todo,
  //         done: false,
  //       });
  //     }
  //   },
  //   [Constant.DONE_TOGGLE]: (state, payload) => {
  //     state.todolist[payload.index].done = !state.todolist[payload.index].done;
  //   },
  //   [Constant.DELETE_TODO]: (state, payload) => {
  //     state.todolist.splice(payload.index, 1);
  //   },
  // },
  // // state를 변경시키는 행위들..(비동기처리) mutation과 분리 관리
  // actions: {
  //   // store 객체를 인자로 받기 때문에, state, getters, mutations 모두 접근 가능
  //   [Constant.ADD_TODO]: (store, payload) => {
  //     console.log(`###### add Todo!!!`);
  //     // state에 영향을 미치므로 commit()
  //     store.commit(Constant.ADD_TODO, payload);
  //   },

  //   // ES6의 구조분해 할당을 사용한 인자
  //   [Constant.DELETE_TODO]: ({
  //     store,
  //     commit
  //   }, payload) => {
  //     console.log(`###### delete Todo!!!`);
  //     commit(Constant.DELETE_TODO, payload);
  //   },
  //   [Constant.DONE_TOGGLE]: (store, payload) => {
  //     console.log(`###### done toggle!!!`);
  //     store.commit(Constant.DONE_TOGGLE, payload);
  //   }
  // }
});

export default store;
