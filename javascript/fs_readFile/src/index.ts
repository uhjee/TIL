import { exportFile, readFilePromise } from './file'

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

const getDate = (): number => {
  const today = new Date()
  return today.getTime()
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
    // console.log(totalErrors)
    const totalCount = totalErrors.length
    console.log('total errors count: ', totalCount)
    const groupErrors = countGroupByError(totalErrors)
    exportFile(`${path}/errors_count${getDate()}.txt`, groupErrors, totalCount, 'array')
    console.log('errors group by type count: ', groupErrors.length)

    const files = Array.from(new Set(content.toString().match(regexErrorFile)))
    exportFile(`${path}/files${getDate()}.txt`, files, totalCount, 'value')
    console.log('files count: ', files.length)
  })
  .catch((err) => {
    console.log(err)
  })
