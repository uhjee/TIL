// 선언부
const func1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1')
      resolve(true)
      // resolve()
    }, 2000)
  })

const func2 = (res) => {
  console.log(res)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2')
      resolve()
    }, 3000)
  })
}

const func3 = () => {
  console.log('3')
}

// 실행부
func1().then(func2).then(func3)

// func1()
//   .then((res) => {
//     setTimeout(() => {
//       console.log(res)
//       // throw new Error('1')
//     }, 3000)
//   })
//   .then(() => {
//     return 'fafafa'
//   })
//   .then((argu) => {
//     console.log(argu)
//   })

// const callAPI1 = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('api1 response')
//     }, 3000)
//     resolve('api1 response _ resolve')
//   })

// callAPI1()
//   .then((response) => {
//     console.log(response)
//     setTimeout(() => {
//       console.log('api2 response')
//     }, 3000)
//     return response
//   })
//   .then((response) => {
//     console.log(response)
//     setTimeout(() => {
//       console.log('mine! 2')
//     }, 3000)
//   })
