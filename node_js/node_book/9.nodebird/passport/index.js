const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.export = () => {
  // 로그인 시 실행-> req.session 객체에 어떤 데이터를 저장할 지 설정
  passport.serializeUser((user, done) => {
    done(null, user.id); // 첫번째 파라미터는 에러 처리, 두번째 파라미터에 저장할 데이터
  })

  // 매 요청시마다 실행, passport.session 미들웨어가 호출
  passport.deserializeUser((id, done) => { // serializeUser에서 세팅한 데이터가 첫 번째 파라미터
    User.findOne({where: {id}})
      .then(user => done(null, user)) // req.user에 세팅
      .catch(err => done(err));
  });

  local();
  kakao();
};
