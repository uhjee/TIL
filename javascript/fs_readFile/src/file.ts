import { readFile, createWriteStream } from 'fs'

const changeLine: string = '\n'
const changeDoubleLine = changeLine + changeLine

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
export const exportFile = (filename: string, arr: any[], type: string, printProp?: { totalCount?: number; totalTime?: string }): void => {
  const file = createWriteStream(filename)
  file.on('error', function (err) {
    console.error(err)
  })
  arr.forEach((v) => {
    // let value = null
    if (type === 'array') {
      const value = v.join(', ') + changeLine
      file.write(value)
    } else {
      // value = v.split('/').pop() + '\n'
      const value = v + changeLine
      file.write(value)
    }
  })
  file.write(changeDoubleLine)
  file.write(`-- Count: ${arr.length} ${changeDoubleLine}`)
  if (printProp !== null && printProp !== undefined) {
    let cnt = 0
    for (let key of Object.keys(printProp)) {
      // file.write(`-- ${key}: ${printProp[key]} ${cnt === Object.keys(printProp).length ? '' : changeLine}`)
      console.log(printProp[key])

      file.write(`-- ${key}: ${printProp[key]}`)
      cnt += 1
    }
  }
  file.end()
}
