import { TodoType } from '@/types/TodoType';
import { Chance } from 'chance';
import * as R from 'ramda';

const c = new Chance();
const COLORS = ['red', 'blue', 'grey', 'yellow', 'green'];

export const makeTodo = (): TodoType =>
  ({
    id: c.fbid(),
    color: COLORS[Math.floor(Math.random() * 10) % 5],
    content: c.paragraph(),
    date: ((d: Date) =>
      `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)(c.date()),
    isDone: false,
  } as TodoType);

export const makeTodoList = (max: number): TodoType[] =>
  R.range(1, max + 1).map(() =>
    makeTodo());
