import { readFile } from 'fs';

// 구현부
export const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error);
      else resolve(buffer.toString());
    });
  });

// 사용부 - then, catch, finally
readFilePromise('./package.json') //
  .then((content: string) => {
    console.log(content);
    return readFilePromise('./tsconfig.json');
  })
  .then((content: string) => {
    console.log(content);
    return readFilePromise('.');
  })
  .catch((error: Error) => console.log('error: ', error.message))
  .finally(() => {
    console.log('프로그램 종료 ...');
  });
