/**
 * .d.ts 파일: typescript의 타입 추론을 돕는 파일
 * 구현부가 아닌 선언부만을 작성하는 용도
 * JS 로 컴파일되지 않는다.
 */
export type TodoType = {
  id: number;
  text: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy';
  checked: boolean;
};
