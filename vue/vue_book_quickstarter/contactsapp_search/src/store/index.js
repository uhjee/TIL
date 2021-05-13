import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../constant';
import SearchApi from '../api/SearchAPI';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    contacts: []
  },
  mutations: {
    //   실제로 state를 변화시키는 행위
    [Constant.SEARCH_CONTACT]: (state, payload) => {
      state.contacts = payload.contacts;
    }
  },
  actions: {
    [Constant.SEARCH_CONTACT]: (store, payload) => {
      // 서버에 요청 (비동기 처리 가능)
      SearchApi.searchContact(payload.name)
        .then(response => {
          // commit()로 mutation 호출
          store.commit(Constant.SEARCH_CONTACT, {
            contacts: response.data
          })
        })
    }
  }
})

export default store;
