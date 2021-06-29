export type ColorType = 'red' | 'blue' | 'grey' | 'yellow' | 'green';

export type TodoType = {
  color: ColorType;
  isDone: boolean;
  content: string;
  date: string;
};
