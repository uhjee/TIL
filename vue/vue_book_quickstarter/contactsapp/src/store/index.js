import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutations from './mutation.js';
import actions from './action.js';
import ES6Promise from 'es6-promise';

ES6Promise.polyfill();
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store;
