import { debounce, throttle } from 'lodash'

// ! debounce
// 콜백 함수 생성
const showConsole = () => {
  console.log('executed...')
}

// debounce 생성
//  - 2초 동안 콜백함수를 여러번 호출해도 한 번만 호출하도록
const debounceAction = debounce(showConsole, 2000)

// 한 번만 실행 -> 콜백함수를 한 번만 호출
// debounceAction()

// 다섯 번 연속 실행 -> 콜백함수를 한 번만 호출
debounceAction()
debounceAction()
debounceAction()
debounceAction()
debounceAction()

// 2초 뒤에 한 번 더 실행 -> 한 번 더 호출됨
setTimeout(debounceAction, 2100)

console.clear()

// ! throttle
const throttleAction = throttle(showConsole, 1000)

let count = 0
console.log('interval start... ')

const callShowConsole = setInterval(
  () => {
    if (count < 10) {
      throttleAction()
      count++
    } else {
      clearInterval(callShowConsole)
      console.log('interval end...')
    }
  },

  100,
)
