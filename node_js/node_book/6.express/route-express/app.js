const express = require('express');

// route 설정
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

// 실행될 포트 설정 (app 에 세팅)
app.set('port', process.env.PORT || 3000);

// router 등록
app.use('/', indexRouter);
app.use('/user', userRouter);

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// 예외처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// listen 핸들러는 http 모듈과 동일
app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 대기 중...`);
});
