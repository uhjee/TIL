import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    people: [
      {name: 'A', age: 10},
      {name: 'B', age: 20},
      {name: 'C', age: 30},
      {name: 'D', age: 40},
      {name: 'E', age: 50},
    ]
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({commit}) {
      commit('increment');
    }
  },
  getters: {
    oldMan: state => {
      return state.people.filter(i => i.age >= 30);
    }
  }
});

export default store;
