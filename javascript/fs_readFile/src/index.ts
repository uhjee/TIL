import { exportFile, readFilePromise } from './file'
import { getDate, getTotalTime } from './util'

const path: string = `./files`

const regexErrorMessage: RegExp = /\s{2}\?\?\s+http[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+(google|eslint)[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/gi
const regexErrorFile: RegExp = /src[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+(vue|js|json)/gim

const countGroupByError = (array: any[]): any[] => {
  const result = {}
  for (let item of array) {
    result[item] = result[item] !== undefined ? result[item] + 1 : 1
  }
  return Object.entries(result)
  // return Object.keys(result)
  // return Object.values(result)
}

readFilePromise('./dev_log.txt')
  .then((content) => {
    if (content === null && content === undefined) {
      console.log('content is undefined')
      return
    }

    const rawTotalErros = content.toString().match(regexErrorMessage)
    const totalErrors =
      rawTotalErros !== null && rawTotalErros !== undefined //
        ? rawTotalErros.map((item) => item.substring(item.indexOf('http')))
        : []
    const groupErrors = countGroupByError(totalErrors)
    const files = Array.from(new Set(content.toString().match(regexErrorFile)))

    const totalCount = totalErrors.length
    const totalTime = getTotalTime(content)
    const printProp = { totalTime, totalCount }

    exportFile(`${path}/errors_count${getDate()}.txt`, groupErrors, 'array', printProp)
    exportFile(`${path}/files${getDate()}.txt`, files, 'value', printProp)

    console.log('  - total build time: ', totalTime)
    console.log('  - total errors count: ', totalCount)

    console.log('  - errors group by type count: ', groupErrors.length)
    console.log('  - files count: ', files.length)
    console.log('> file export success...')
  })
  .catch((err) => {
    console.log(err)
  })
