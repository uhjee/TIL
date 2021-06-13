import { readFile } from 'fs';

// ! readFile 의 콜백에서 다시 readFile 호출

// outer readFile
readFile('./package.json', (err: Error, buffer: Buffer) => {
  if (err) throw err;
  else {
    const content: string = buffer.toString();
    console.log(content);

    // inner readFile
    readFile('./tsconfig.json', (err: Error, buffer: Buffer) => {
      if (err) throw err;
      else {
        const content: string = buffer.toString();
        console.log(content);
      }
    });
  }
});
