import path from 'path'
import { exportFile, readFilePromise } from './file'
import { getDate, getTotalTime, countGroupByError } from './util'

const regexErrorMessage: RegExp = /\s{2}\?\?\s+http[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+(google|eslint)[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/gi
const regexErrorFile: RegExp = /src[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+(vue|js|json)/gim

const fileToRead = './dev_log.txt'
const pathToExport = './files'


readFilePromise(fileToRead)
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


    exportFile(`${pathToExport}/errors_count__${getDate()}.txt`, groupErrors, 'array', printProp)
    exportFile(`${pathToExport}/files__${getDate()}.txt`, files, 'value', printProp)

    console.log('  - total build time: ', totalTime)
    console.log('  - total errors count: ', totalCount)

    console.log('  - errors group by type count: ', groupErrors.length)
    console.log('  - files count: ', files.length)
    console.log('> file export success...')
  })
  .catch((err) => {
    console.log(err)
  })

