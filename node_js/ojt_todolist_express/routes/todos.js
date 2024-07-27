/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseEntity:
 *       type: object
 *       required:
 *         - success
 *         - data
 *       properties:
 *         success:
 *           type: boolean
 *           description: 서버 비지니스 로직 정상 동작 여부
 *         data:
 *           type: object
 *           description: 요청에 대한 데이터
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: Todo 생성 후에 부여되는 id
 *         title:
 *           type: string
 *           description: Todo의 제목
 *         description:
 *           type: string
 *           description: Todo의 설명, 내용
 *         isDone:
 *           type: boolean
 *           description: Todo의 완료 여부
 *         checkedAt:
 *           type: string
 *           format: date
 *           description: 완료 일자
 *         userId:
 *           type: number
 *           description: 유저 id
 *       example:
 *         id: 1
 *         title: 빨래하기
 *         description: 코인 세탁방에 가자
 *         isDone: false
 *         checkedAt: 2023-08-10T04:05:06.157Z
 *         userId: 1
 *     PayloadToCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Todo의 제목
 *         description:
 *           type: string
 *           description: Todo의 설명, 내용
 *       example:
 *         title: 빨래하기
 *         description: 코인 세탁방에 가자
 *     PayloadToUpdate:
 *       type: object
 *       required:
 *         - id
 *         - isDone
 *       properties:
 *         id:
 *           type: number
 *           description: 해당 할 일의 ID
 *         isDone:
 *           type: boolean
 *           description: 완료 여부
 *       example:
 *          id: 2
 *          isDone: true
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo 관련 API
 * /todos/{userId}:
 *   get:
 *     summary: 할 일 목록을 조회한다.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: 알려드리는 유저 id
 *     responses:
 *       200:
 *         description: 할 일의 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *   post:
 *     summary: 할 일을 추가한다.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: 알려드리는 유저 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayloadToCreate'
 *     responses:
 *       200:
 *         description: 할 일의 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *       500:
 *         description: 서버 에러
 *   put:
 *     summary: 할 일을 수정한다.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: 알려드리는 유저 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/PayloadToUpdate'
 *     responses:
 *       200:
 *         description: 수정된 할 일의 정보를 반환한다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *       500:
 *         description: 서버 에러
 * /todos/{id}/{userId}:
 *   delete:
 *     summary: 할 일 목록을 조회한다.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 삭제하려는 할 일의 id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: 알려드리는 유저 id
 *     responses:
 *       200:
 *         description: 삭제 개수
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: number
 */

const express = require('express');
const { Todo } = require('../models');

const router = express.Router();

router.post('/:user_id', async (req, res, next) => {
  const userId = req.params.user_id;
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      userId,
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
  const userId = req.params.user_id;

  try {
    const todos = await Todo.findAll({
      where: { userId },
    });
    res.json({
      success: true,
      data: todos,
    });
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
      message: e,
    });
  }
});

router.put('/:user_id', async (req, res, next) => {
  const userId = req.params.user_id;

  const { id, isDone } = req.body;

  console.log(userId, id, isDone);
  try {
    const todo = await Todo.update(
      {
        isDone: isDone,
      },
      {
        where: {
          id,
          userId,
        },
      },
    );
    res.json({
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

router.delete('/:id/:user_id', async (req, res, next) => {
  const id = req.params.id;
  const userId = req.params.user_id;

  try {
    const todo = await Todo.destroy({
      where: {
        id,
        userId,
      },
    });

    console.log(todo);
    res.json({
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
      message: e,
    });
  }
});

module.exports = router;
