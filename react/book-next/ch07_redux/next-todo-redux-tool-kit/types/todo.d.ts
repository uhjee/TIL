// typescript의 타입 추론을 돕는 파일
export type TodoType = {
  id: number;
  text: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy';
  checked: boolean;
};
