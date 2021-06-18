const regexTotalTime: RegExp = /general output[\w\,\.\s]+$/gim

export const getDate = (): number => {
  const today = new Date()
  return today.getTime()
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
