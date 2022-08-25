import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../todos.service';
import { TodoRepository } from '../todo.repository';
import { makeMockTodo, makeMockCreateTodoDto } from './mock-todo';

class MockTodoRepository {
  createTodo = jest.fn();
}

describe('TodosService', () => {
  let todoService: TodosService;
  let todoRepository: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodoRepository,
          useClass: MockTodoRepository,
        },
      ],
    }).compile();

    todoService = module.get<TodosService>(TodosService);
    todoRepository = module.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('createTodo()', () => {
    it('파라미터 정상 입력 시, 생성된 투두를 반환해야 함', () => {
      const mockTodo = makeMockTodo();
      jest.spyOn(todoRepository, 'createTodo').mockResolvedValue(mockTodo);

      expect(todoService.createTodo(makeMockCreateTodoDto())).resolves.toEqual(
        mockTodo,
      );
    });
  });
});
