// pow 함수에 대한 테스트 명세
// describe('pow', function () {
// // use case
// it('2를 세 번 곱하면 8?', function () {
//   //  test 1
//   assert.equal(pow(2, 3), 9)
// })
// // use case2
// it('3을 네 번 곱하면 81?', () => {
//   //  test
//   assert.equal(pow(3, 4), 81)
// })
// })

// // ! loop문으로 test code 만들기
// describe('pow', () => {
//   // 테스트 코드 maker
//   const makeTest = (x) => {
//     let expected = x * x * x
//     it(`${x}를 세 번 곱하면 ${expected} ?`, () => {
//       assert.equal(pow(x, 3), expected)
//     })
//   }

//   for (let i = 0; i < 9; i++) {
//     makeTest(i)
//   }
// })

// ! 중첩 describe
describe('pow', () => {
  const makeDescribe = (x, n) => {
    describe(`${x}를 ${n} 번 곱하자.`, () => {
      // 테스트 코드 maker
      const makeTest = (x) => {
        let expected = 1

        for (let i = 0; i < n; i++) {
          expected *= x
        }
        it(`${x}를 ${n} 번 곱하면 ${expected} ?`, () => {
          assert.equal(pow(x, n), expected)
        })
      }

      for (let i = 0; i < 5; i++) {
        makeTest(i)
      }
    })
  }

  makeDescribe(2, 20)
  makeDescribe(3, 4)
})

describe('add', () => {
  before(() => {
    console.log('전체 테스트 시작 전')
  })
  after(() => {
    console.log('전체 테스트 끝')
  })

  beforeEach(() => {
    console.log('개별 테스트 시작')
  })
  afterEach(() => {
    console.log('개별 테스트 끝')
  })

  it('2 더하기 3 ?', () => {
    assert.equal(add(2, 3), 5)
    console.log('it 내부')
  })
})

describe('pow2', () => {
  it('2 의  5제곱은 ?', () => {
    assert(add(2, 5), 64)
  })

  it('2의 음수 제곱은 NaN?', () => {
    assert.isNaN(pow(2, -1))
  })

  it('2의 정수가 아닌 제곱은 NaN?', () => {
    assert.isNaN(pow(2, 1.5))
  })
})
