type numberFunc = (a: number, b: number) => number

const add: numberFunc = (a: number, b: number) => a + b

// 선택적 매개변수와 기본 매개변수

// 선택적 매개변수
const introduce = (name: string, age?: number): void => {
  console.log(`이름은 ${name} 이고, 나이는 ${age} 이다`)
}

introduce('jee')
introduce('jee', 30)

// 기본 매개변수
const introduce1 = (name: string, age: number = 100): void => {
  console.log(`이름은 ${name} 이고, 나이는 ${age} 이다`)
}

introduce1('jee', 40)
introduce1('jee')
