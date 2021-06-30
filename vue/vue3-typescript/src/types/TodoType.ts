export type ColorType = 'red' | 'blue' | 'grey' | 'yellow' | 'green';

export type TodoType = {
  id: string;
  color: ColorType;
  isDone: boolean;
  content: string;
  date: string;
};
