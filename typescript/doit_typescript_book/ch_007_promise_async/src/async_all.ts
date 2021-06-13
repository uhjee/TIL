import { readFile } from 'fs';

export const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error);
      else resolve(buffer.toString());
    });
  });

const readFileAll = async (filenames: string[]) => {
  return await Promise.all(
    //
    filenames.map((filename) => readFilePromise(filename)),
  );
};

// 호출
readFileAll(['./package.json', './tsconfig.json'])
  .then(([packageJson, tsconfigJson]: string[]) => {
    console.log('package.json => ', packageJson);
    console.log('tsconfig.json => ', tsconfigJson);
  })
  .catch((error) => {
    console.log(error.message);
  });
