import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    // dto validation
    const invalidProps = [];
    Object.entries(createTodoDto).forEach(([key, value]) => {
      if (!value) invalidProps.push(key);
    });
    if (invalidProps.length > 0) {
      const invalidPropsString = invalidProps.reduce((result, value, index) => {
        let text = result + value;
        if (index !== invalidProps.length - 1) {
          text += ', ';
        }
        return text;
      }, '');
      throw new BadRequestException(`${invalidPropsString}가 없습니다.`);
    }
    return await this.todoRepository.createTodo(createTodoDto);
  }
}
