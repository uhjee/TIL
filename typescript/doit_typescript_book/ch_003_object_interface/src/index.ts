// ! 01. object 타입의 재할당 가능 문제
let obj: object = { name: 'jee', age: 23 } // obj 선언 및 할당
console.log(obj)

obj = { name: 'goo', weight: 492 } // object Type이므로 재할당 가능
console.log(obj)

// ! 02. interface
// 인터페이스 생성
interface ivehicle {
  type: string
  wheelCount: number
  // 익명 인터페이스
  manufactor: {
    name: string
    country: string
  }
  price?: number // optional
}

// 인터페이스 인스턴스 생성
let hyundaiCar: ivehicle = {
  type: 'car',
  wheelCount: 4,
  manufactor: {
    name: 'hyundai',
    country: 'korea',
  },
}

console.log(hyundaiCar)

// 함수 argu를 익명 인터페이스로 선언
const printMe = (me: { type: string; wheelCount: number }) => {
  console.log(`${me.type} // ${me.wheelCount}`)
}

// 호출부에서는 따로 선언한 iVehicle type을 넣어줘도
// interface 조건만 맞으면 타입 통과하는 듯 ... 신기
printMe(hyundaiCar)
