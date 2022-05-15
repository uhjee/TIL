import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

/**
 * TODO.json 데이터 중 해당하는 id의 todo 데이터의 checked 속성을 변경한다.
 *
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[type]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * id의 Todo checked 속성을 변경한다.
   */
  if (req.method === 'PATCH') {
    try {
      const todoId = Number(req.query.id);
      // 데이터가 있는지 확인
      const isExist = Data.todo.exist({ id: todoId });
      if (!isExist) {
        res.statusCode = 404;
        res.end();
      }

      // todos 리스트 조회 및 checked 변경
      const todos = await Data.todo.getList();
      const changedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });

      // todos 데이터 업데이트
      Data.todo.write(changedTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.statusCode = 500;
      console.log(e);
      return res.send(e);
    }

    res.statusCode = 405;
    return res.end();
  }

  /**
   *  id의 Todo를 삭제한다.
   */
  if (req.method === 'DELETE') {
    try {
      const todoId = Number(req.query.id);
      console.log(req.query.id);
      const todos = Data.todo.getList();
      const filteredTodos = todos.filter(todo => todo.id !== todoId);
      console.log({ filteredTodos });

      Data.todo.write(filteredTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  }
};
