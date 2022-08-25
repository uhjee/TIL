import { Controller, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post('')
  async createTodo(createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }
}
