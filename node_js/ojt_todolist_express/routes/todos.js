const express = require('express');
const {Todo} = require('../models');

const router = express.Router();


router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.userId,
    });
    console.log(todo);
    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
      message: e,
    });
  }
});

router.get('/:user_id', async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const todos = await Todo.findAll({
      where: {'user_id': user_id},
    });
    console.log(todos);
    res.json({
      success: true,
      data: todos,
    })
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
      message: e,
    });
  }
})

module.exports = router;
