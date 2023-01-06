const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const comment = Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        const result = await Comment.populate(comment, {path: 'commenter'}); // populate를 이용해 관련 데이터 채우기
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.route('/:id').patch(async (req, res, next) => {
    try {
        const result = await Comment.update({
            _id: req.params.id,
        }, {
            comment: req.body.comment,
        });
        res.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
}).delete(async (req, res, next) => {
    try {
        const result = await Comment.remove({_id: req.params.id});
        res.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
