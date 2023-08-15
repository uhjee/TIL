import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 중앙 관리 상태
  state: {
    todos: [
      {
        id: 0,
        title: '책을 필히 읽을 것',
        description: '제발...',
        isDone: true,
      },
      {
        id: 1,
        title: '울지 않기',
        description: '제발...',
        isDone: false,
      },
      {
        id: 2,
        title: '행복하기',
        description: '제발...',
        isDone: false,
      },
    ]
  },
  // 상태 변경, 변이
  mutations: {
    addTodo(state, payload) {
      state.todos = [...state.todos, payload]
    },
    setTodos(state, newTodos) {
      state.todos = newTodos
    }

  },
  // 비동기로 동작
  actions: {
    addTodo({commit}, payload) {
      commit('addTodo', payload);
    },
    changeDone({commit, state}, payload) {
      const newTodos = state.todos.map(i => {
        if (i.id === payload) {
          i.isDone = true;
        }
        return i;
      });
      commit('setTodos', newTodos);
    }
  },
  // getter
  getters: {
    nextId: state => {
      return state.todos.reduce((max, i) => Math.max(max, i.id), 0) + 1 || 0;
    }
  }
});


export default store;
