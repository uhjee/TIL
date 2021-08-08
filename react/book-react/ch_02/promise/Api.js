const loginAPICall = (userId, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // api 요청 대신 비동기 api인 setTimeout으로 대체 처리
      if (userId === 'jimny' && password === 9999) {
        resolve(10000);
      } else {
        reject('ID를 다시 확인해봐');
      }
      return;
    }, 2000);
  });

const checkKeyAPICall = key =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // param 유효성 체크
      if (key === undefined || key === null) {
        reject('파라미터를 확인해');
      }

      if (key === 10000) {
        resolve(true);
      } else {
        resolve(false);
      }
      return;
    }, 2000);
  });

// ! 01. 개별 API 호출
// loginAPICall('jimny', 9999).then(response => {
//   console.log(response);
// });

// checkKeyAPICall(10000).then(response => {
//   console.log(response);
// });

// ! 02. then 으로 순차적으로 호출
// loginAPICall('jimny', 9999)
//   .then(checkKeyAPICall)
//   .then(response => {
//     console.log(response);
//    // response 데이터로 할 일 하기
//   })
//   .catch(errorMessage => console.log(errorMessage));

// ! 03. Promise.all 사용해보기
const addPost = content =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (content === undefined || content === null) {
        reject('content를 확인해');
      }
      resolve(`[${content.substring(0, 5)}... 추가 완료]`);
      return;
    }, 2000);
  });

const allTest = () => {
  Promise.all([addPost('test01'), addPost('test02'), addPost('test03')]).then(
    responses => {
      console.log(responses);
    },
  );
};

// allTest();

// ! 04. Promise.race 사용해보기

const raceTest = () => {
  Promise.race([addPost('test01'), addPost('test02'), addPost('test03')]).then(
    responses => {
      console.log(responses);
    },
  );
};

// raceTest();
