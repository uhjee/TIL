const regexTotalTime: RegExp = /general output[\w\,\.\s]+$/gim

export const getDate = (): string => {
  const today = new Date()
  return `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}__${today.getHours()}_${today.getMinutes()}`
}

export const getTotalTime = (content: string): string => {
  // export const getTotalTime = (): string => {
  const totalTimeArr: RegExpMatchArray = content.match(regexTotalTime) || []
  const totalTime: string = totalTimeArr[0]
  // const totalTime = 'General output time took 7 mins, 52.45 secs'
  const parsedTotalTimeArr: string[] = totalTime.split(' ')

  // console.log(parsedTotalTimeArr.slice(4).join(' '))
  return parsedTotalTimeArr.slice(4).join(' ')
}

export const countGroupByError = (array: any[]): any[] => {
  const result = {}
  for (let item of array) {
    result[item] = result[item] !== undefined ? result[item] + 1 : 1
  }
  return Object.entries(result)
  // return Object.keys(result)
  // return Object.values(result)
}
