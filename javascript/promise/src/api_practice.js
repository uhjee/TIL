const axios = require('axios');

// ! git 올리기 전에 삭제
const KEYS = {};

const fetchMovies = title =>
  // ? 대기(pending) : 이행하거나 거부되지 않은 초기 상태
  new Promise(async (resolve, reject) => {
    try {
      const params = {
        apikey: KEYS.OMDB_API_KEY,
        i: KEYS.OMDB_ID,
        s: title,
      };
      const res = await axios.get('https://omdbapi.com', { params });
      // ? 이행(fulfilled): 연산이 성공적으로 완료됨
      resolve(res);
    } catch (e) {
      // ? 거부(rejected) : 연산 실패
      reject(e.message);
    }
  });

const test = async () => {
  try {
    const res = await fetchMovies('frozen');
    console.log(res.data.Search);
  } catch (e) {
    console.log(e);
  }
};

test();
