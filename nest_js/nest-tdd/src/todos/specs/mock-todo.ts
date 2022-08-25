import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';

export const makeMockCreateTodoDto = (): CreateTodoDto => ({
  content: 'Be Happy.',
  status: 'NOT_DONE',
});

export const makeMockTodo = (): Todo => ({
  id: 1,
  content: 'Be Happy.',
  status: 'NOT_DONE',
  createdAt: new Date(),
  deletedAt: new Date(),
});
