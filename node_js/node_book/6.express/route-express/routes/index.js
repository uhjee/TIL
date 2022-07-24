const express = require('express');
const path = require('path');

const router = express.Router();

// GET [/] 라우터
router.get(
  '/',
  (req, res, next) => {
    next('route'); // 'route'라는 파라미터를 넘기면, 다음 미들웨어가 아닌 라우터로 바로 감
  },
  (req, res) => {
    console.log('실행이 안됩니다.');
  },
  (req, res) => {
    console.log('실행이 안됩니다.');
  },
);

router.get('/', (req, res) => {
  console.log('실행되나요?');
  res.send('제가 마지막 라우터');
});

module.exports = router;
