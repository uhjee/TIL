import fs from 'fs';
import { readFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { TodoType } from '../../types/todo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // 요청 method가 GET인지 확인
    if (req.method === 'GET') {
      // readFile 은 비동기 함수이기 때문에 Promise 사용해 파일 불러오는 것 대기

      const todos: TodoType[] = await new Promise<TodoType[]>(
        (resolve, reject) => {
          // file system 사용해 데이터 불러오기
          fs.readFile('data/todos.json', (err, data) => {
            if (err) {
              return reject(err.message);
            }
            // 읽어들인 데이터 파일은 Buffer 타입이기 때문에 String으로 변환
            const todosData = data.toString();
            // 데이터가 없다면 빈 배열 반환
            if (!todosData) {
              return resolve([]);
            }
            const todos = JSON.parse(todosData);
            return resolve(todos);
          });
        },
      );

      res.statusCode = 200;
      return res.send(todos);
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(e);
  }
};
