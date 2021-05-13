import axios from 'axios';
import Constant from '../constant'

export default {
  searchContact: (name) => {
    //   응답으로 온 Promise 객체를 그대로 리턴
    // 액션에서 Promise 객체를 받아서 .then 메소드로 비동기 처리하여 mutation을 commit하게 한다
    return axios.get(`${Constant.BASE_URL}/${name}`);
  }
}
