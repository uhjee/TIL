import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

/**
 * [CUSTOM REPOSITORY]
 */

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(private dataSource: DataSource) {
    super(Todo, dataSource.createEntityManager());
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    return await this.save(createTodoDto);
  }

  async getTodoById(id: number) {
    const foundTodo = await this.findOne({ where: { id } });
    if (foundTodo) {
      return foundTodo;
    }
    throw new NotFoundException('해당 Todo가 존재하지 않습니다.');
  }
}
