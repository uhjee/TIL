import { readFile, readFileSync } from 'fs';

// synchronous
console.log('read package.json using sync api...(동기)');
const buffer: Buffer = readFileSync('./package.json');
console.log(buffer.toString());

//asyncronous
// 코드는 응답을 대기하지 않고, 계속 실행(이후의 응답은 callback 이 다룬다)
readFile('./package.json', (error: Error, buffer: Buffer) => {
  console.log('read package.json using async api... (비동기)');
  if (error) throw error;
  // 오류 발생 시 처리 코드
  else {
    const content: string = buffer.toString();
    console.log(content);
  }
});

// Promise, async/await
// promise 객체 생성
const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error);
      else resolve(buffer.toString());
    });
  });

// async/await로 호출
(async () => {
  const content = await readFilePromise('./package.json');
  console.log('read package.json using async api... (Promise and async/await)');
  console.log(content);
})();
