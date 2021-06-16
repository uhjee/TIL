import { readFile, createWriteStream } from 'fs'

/**
 * 비동기로 파일을 읽는다.
 *
 * @param   {string<string>}   fileName  [fileName description]
 * @return  {Promise<string>}            [return description]
 */
export const readFilePromise = (fileName: string): Promise<string> =>
  new Promise((resolve, reject) => {
    readFile(fileName, (err, buffer) => {
      if (err) reject(err)
      else resolve(buffer.toString())
    })
  })

/**
 * 타입에 따라 파일을 출력한다.
 *
 * @param   {string}        filename    [filename description]
 * @param   {any[]}         arr         [arr description]
 * @param   {number}        totalCount  하단에 출력할 전체 error 개수
 * @param   {string}        type        'array', 'value'
 *
 * @return  {void}              [return description]
 */
export const exportFile = (filename: string, arr: any[], totalCount: number, type: string): void => {
  const file = createWriteStream(filename)
  file.on('error', function (err) {
    console.error(err)
  })
  arr.forEach((v) => {
    // let value = null
    if (type === 'array') {
      const value = v.join(', ') + '\n'
      file.write(value)
    } else {
      // value = v.split('/').pop() + '\n'
      const value = v + '\n'
      file.write(value)
    }
  })
  file.write(`-- Count: ${arr.length}\n`)
  file.write(`-- Total count: ${totalCount}`)
  file.end()
}
