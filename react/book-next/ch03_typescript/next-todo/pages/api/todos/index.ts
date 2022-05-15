import fs from 'fs';
import { readFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { TodoType } from '../../../types/todo';

/**
 * Todo.json 데이터를 조회한다.
 *
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[type]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    /**
     * [GET] todo 조회
     */
    if (req.method === 'GET') {
      console.log('[GET] api/todos');
      // // readFile 은 비동기 함수이기 때문에 Promise 사용해 파일 불러오는 것 대기
      // const todos: TodoType[] = await new Promise<TodoType[]>(
      //   (resolve, reject) => {
      //     // file system 사용해 데이터 불러오기
      //     fs.readFile('data/todos.json', (err, data) => {
      //       if (err) {
      //         return reject(err.message);
      //       }
      //       // 읽어들인 데이터 파일은 Buffer 타입이기 때문에 String으로 변환
      //       const todosData = data.toString();
      //       // 데이터가 없다면 빈 배열 반환
      //       if (!todosData) {
      //         return resolve([]);
      //       }
      //       const todos = JSON.parse(todosData);
      //       return resolve(todos);
      //     });
      //   },
      // );

      // 위 로직을 아래 메소드로 대체
      const todos = Data.todo.getList();

      res.statusCode = 200;
      return res.send(todos);
    }

    /**
     * [POST] todo 추가
     */
    if (req.method === 'POST') {
      // 값을 받았는지 확인
      const { text, color } = req.body;
      if (!text || !color) {
        res.statusCode = 400;
        return res.send('text 혹은 color가 없습니다.');
      }
      // index 구하기
      const todos = Data.todo.getList();
      let todoId: number =
        todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

      const newTodo: TodoType = {
        id: todoId,
        text,
        color,
        checked: false,
      };
      console.log({ newTodo });
      Data.todo.write([...todos, newTodo]);
      res.statusCode = 200;
      res.end();
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(e);
  }
};
