const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

/**
 * [회원 가입]
 */
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) return res.redirect('/join?error=exist');
    // create user
    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hashPassword,
    });
    return res.redirect('/');
  } catch (e) {
    console.error(e);
    return next(error);
  }
});

/**
 * 로그인__local
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
  // passport.authenticate => middleware
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    // passport 가 추가한 메소드 req.login => passport.serialize 호출
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next) 붙임
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy(); // 세션 객체 내용 제거
  res.redirect('/');
});

/**
 * 카카오 로그인
 */
router.get('/kakao', passport.authenticate('kakao'));

/**
 * 카카오 로그인 콜백 라우트 (카카오 인증 서버 => 현 node 서버)
 */
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    // kakao login은 내부적으로 req.login 호출
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

// router.get('/kakao/clear', async (req, res) => {
//   try {
//     const ACCESS_TOKEN = res.locals.user.accessToken;
//   } catch (e) {
//
//   }
// })

module.exports = router;
