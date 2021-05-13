import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
import _, {
  map
} from 'lodash';

// Vue 인스턴스에서 Vuex 사용 선언
Vue.use(Vuex);

const store = new Vuex.Store({
  // 상태
  state: {
    currentRegion: 'all',
    countries: [{
        no: 1,
        name: "미국",
        capital: "워싱턴DC",
        region: "america"
      },
      {
        no: 2,
        name: "프랑스",
        capital: "파리",
        region: "europe"
      },
      {
        no: 3,
        name: "영국",
        capital: "런던",
        region: "europe"
      },
      {
        no: 4,
        name: "중국",
        capital: "베이징",
        region: "asia"
      },
      {
        no: 5,
        name: "태국",
        capital: "방콕",
        region: "asia"
      },
      {
        no: 6,
        name: "모로코",
        capital: "라바트",
        region: "africa"
      },
      {
        no: 7,
        name: "라오스",
        capital: "비엔티안",
        region: "asia"
      },
      {
        no: 8,
        name: "베트남",
        capital: "하노이",
        region: "asia"
      },
      {
        no: 9,
        name: "피지",
        capital: "수바",
        region: "oceania"
      },
      {
        no: 10,
        name: "솔로몬 제도",
        capital: "호니아라",
        region: "oceania"
      },
      {
        no: 11,
        name: "자메이카",
        capital: "킹스턴",
        region: "america"
      },
      {
        no: 12,
        name: "나미비아",
        capital: "빈트후크",
        region: "africa"
      },
      {
        no: 13,
        name: "동티모르",
        capital: "딜리",
        region: "asia"
      },
      {
        no: 14,
        name: "멕시코",
        capital: "멕시코시티",
        region: "america"
      },
      {
        no: 15,
        name: "베네수엘라",
        capital: "카라카스",
        region: "america"
      },
      {
        no: 16,
        name: "서사모아",
        capital: "아피아",
        region: "oceania"
      }
    ]
  },
  //   store의 상태를 가져올 때 Getter 느낌
  //   각각 컴포넌트에서 computed를 작성할 필요가 없다 
  getters: {
    countriesByRegion(state) {
      if (state.currentRegion == 'all') {
        return state.countries;
      } else {
        //   Arrays.filter() ==> 조건에 부합하는 요소들의 새로운 배열로 반환
        return state.countries.filter(c => c.region == state.currentRegion);
      }
    },

    // 중복이 없는 지역정보만 추출하여 반환하는 메소드
    regions(state) {
      // Arrays.map() ==> 새로운 배열로 반환
      let temp = state.countries.map(c => c.region);

      //   중복값 제거하는 lodash 메소드
      temp = _.uniq(temp);

      //   배열의 첫 번째 위치에  'all' 단어를 삽입하는 방법
      temp.splice(0, 0, 'all');
      return temp;
    },
    currentRegion(state) {
      return state.currentRegion
    }
  },
  //   변이: 상태에 영향을 미치는 행위들
  mutations: {
    [Constant.CHANGE_REGION]: (state, payload) => {
      // html태그 안에서 넣어주는 {key: value} 들은 payload.key로 호출 가능
      state.currentRegion = payload.region;
    }
  }

})

export default store;
