const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}); // 컬렉션의 전체 도큐먼트 조회
        res.render('mongoose', {users}); // 렌더링 시, users 변수로 넣기
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
