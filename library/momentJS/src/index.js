const moment = require('moment')
/**
 * terminal - [node src] 로 테스트 진행
 * 주로 회사에서 사용하고 있는 moment 문제를 테스트하기 위한 용도로 사용할 듯
 */

// ! startOf : 시간의 '내림'. 기준 이하의 개념들은 0 으로 초기화
console.log(moment())
console.log(moment().startOf('minute'))

// const testDay = moment().startOf('minute').toDate().getMilliseconds()
const testDay = moment().startOf('minute').toDate()
console.log(testDay)

// ! isSameOrAfter(): 기준일.isSameOrAfter(비교일자)
console.log(moment(1621789404543))
const isSameOrAfter1 = moment(1621789404543).startOf('minute').isSameOrAfter(moment().startOf('minute').toDate())
console.log(isSameOrAfter1)

console.log(moment(1621839822827))
const isSameOrAfter2 = moment(1621839822827).startOf('minute').isSameOrAfter(moment().startOf('minute').toDate())
console.log(isSameOrAfter2)
