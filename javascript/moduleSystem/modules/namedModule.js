// 특정 이름으로 내보내기

// 01. 함수
export const sayHello = () => {
  console.log('Hello');
}

export function sayHi() {
  console.log('Hi');
}

// 02. 배열
export const animals = ['deer', 'lion', 'rabbit', 'turtle', 'bear'];

// 03. 문자열 (Define 상수처럼 사용)
export const COUNTRY = 'KOREA';

// 03. 선언부와 떨어진 곳에서 export
function sayBye() {
  console.log('Bye!');
}

export { sayBye };
