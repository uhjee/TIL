// Semi-coroutine: 단일 스레드인 js가 다중 스레드와 같이 동작하는 것처러 보이는 기능
//   - 생성기도 이와 같은 semi-coroutine 방식으로 동작

let count = 0
setInterval(() => {
  if (count === 5) {
    clearInterval()
  } else {
    console.log(`interval ${count++}`)
  }
}, 1000)
