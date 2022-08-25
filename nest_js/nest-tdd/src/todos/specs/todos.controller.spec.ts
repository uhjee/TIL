import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from '../todos.controller';
import { TodosService } from '../todos.service';
import { makeMockCreateTodoDto, makeMockTodo } from './mock-todo';

class MockTodoService {
  createTodo = jest.fn();
}

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useClass: MockTodoService,
        },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
  });
  describe('createTodo', () => {
    it('정확한 값과 함께 TodoService의 createTodo를 호출해야 한다.', async () => {
      const createSpy = jest.spyOn(todosService, 'createTodo');
      const mockParam = makeMockCreateTodoDto();
      await todosController.createTodo(mockParam);
      expect(createSpy).toHaveBeenCalled();
    });

    it('TodoService가 예외를 던지면, 별도의 처리없이 처리없이 던져야 한다.', async () => {
      const createSpy = jest
        .spyOn(todosService, 'createTodo')
        .mockRejectedValueOnce(new Error());
      await expect(
        todosController.createTodo(makeMockCreateTodoDto()),
      ).rejects.toThrow(new Error());
    });

    it('성공 시, 생성된 Todo를 반환한다.', async () => {
      const mockReturned = makeMockTodo();
      jest
        .spyOn(todosService, 'createTodo')
        .mockResolvedValueOnce(mockReturned);
      const response = await todosController.createTodo(
        makeMockCreateTodoDto(),
      );
      expect(response).toStrictEqual(mockReturned);
    });
  });
});
