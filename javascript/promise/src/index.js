// 선언부
const func1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1')
      resolve('ho')
      // resolve()
    }, 2000)
  })

const func2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2')
      resolve()
    }, 3000)
  })

const func3 = () => {
  console.log('3')
}

// 실행부
// func1().then(func2).then(func3)

func1()
  .then((res) => {
    setTimeout(() => {
      console.log(res)
      // throw new Error('1')
    }, 3000)
  })
  .then(() => {
    return 'fafafa'
  })
  .then((argu) => {
    console.log(argu)
  })
