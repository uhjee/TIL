const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');

dotenv.config();

const app = express();

// 실행될 포트 설정 (app 에 세팅)
app.set('port', process.env.PORT || 3000);

app.use(
  // morgan('dev'), // 요청과 응답에 대한 정보를 로깅
  (req, res, next) => {
    // 함수로 한 번 warpping => 기존 미들웨어의 확장
    morgan(process.env.NODE_env === 'production' ? 'combined' : 'dev')(
      req,
      res,
      next,
    );
  },
  express.json(), // body-parser (express 내장)
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET),
);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  }),
);

// multipart
try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어서 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // destination : 어디에
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      // 어떤 이름으로 저장할지
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

// file 한개
app.post(
  '/upload/single',
  // multer를 사용해 multipart 파일 파싱한 것 받아오기
  upload.single('image'),
  (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
  },
);

// file 여러개 선택 (input file의 multiple 속성)
app.post(
  '/upload/multiple',
  // multer를 사용해 multipart 파일 파싱한 것 받아오기
  upload.array('many'),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  },
);
app.post(
  '/upload/fields',
  // multer를 사용해 multipart 파일 파싱한 것 받아오기
  upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  },
);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// listen 핸들러는 http 모듈과 동일
app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 대기 중...`);
});
