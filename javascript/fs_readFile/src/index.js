import { readFile, createWriteStream, writeFile } from 'fs'

const readFilePromise = (fileName) =>
  new Promise((resolve, reject) => {
    readFile(fileName, (err, buffer) => {
      if (err) reject(err)
      else resolve(buffer.toString())
    })
  })

const countItem = (array) => {
  const result = {}
  for (let item of array) {
    result[item] = result[item] !== undefined ? result[item] + 1 : 1
  }
  return Object.entries(result)
  // return Object.keys(result)
  // return Object.values(result)
}

const exportFile = (filename, arr, totalCount, type) => {
  const file = createWriteStream(filename)
  file.on('error', function (err) {
    console.error(err)
  })
  arr.forEach((v) => {
    let value = null
    if (type === 'array') {
      value = v.join(', ') + '\n'
    } else {
      // value = v.split('/').pop() + '\n'
      value = v + '\n'
    }
    file.write(value)
  })
  file.write(`-- Count: ${arr.length}\n`)
  file.write(`-- Total count: ${totalCount}`)
  file.end()
}

const getDate = () => {
  const today = new Date()
  return today.getTime()
}

const path = `./files`

readFilePromise('./dev_log.txt')
  .then((content) => {
    if (content === null && content === undefined) {
      console.log('content is undefined')
      return
    }

    const rawTotalErros = content.toString().match(/\s{2}\?\?\s+http[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+(google|eslint)[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/gi)
    const totalErrors = rawTotalErros.map((item) => item.substring(item.indexOf('http')))
    // console.log(totalErrors)
    const totalCount = totalErrors.length
    console.log('total errors count: ', totalCount)
    const groupErrors = countItem(totalErrors)
    exportFile(`${path}/errors_count${getDate()}.txt`, groupErrors, totalCount, 'array')
    console.log('errors group by type count: ', groupErrors.length)

    const files = Array.from(new Set(content.toString().match(/src[\w\[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+(vue|js|json)/gim)))
    exportFile(`${path}/files${getDate()}.txt`, files, totalCount, 'value')
    console.log('files count: ', files.length)
  })
  .catch((err) => {
    console.log(err)
  })
