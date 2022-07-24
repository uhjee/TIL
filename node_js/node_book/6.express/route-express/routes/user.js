const express = require('express');

const router = express.Router();

// GET [/user] 라우터
router
  .route('/')
  .get((req, res) => {
    res.send('GET/ User');
  })
  .post((req, res) => {
    res.send('POST/ User');
  });

// route 매개변수
// !  일반 라우터보다 뒤에 위치해야 함! (와일드카드 역할)
router.get('/:id', (req, res) => {
  console.log(req.params, req.query);
  res.send(`id는 ${req.params.id}입니다. `);
});

module.exports = router;
