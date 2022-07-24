import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import CreateBoardDto from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = Array.from(Array(10), (_, i) => ({
    id: uuid(),
    title: `title ${i}`,
    description: `test ${i}`,
    status: i % 2 === 0 ? BoardStatus.PRIVATE : BoardStatus.PUBLIC,
  }));

  /**
   * 모든 보드를 반환한다.
   * @return  {Board[]} [return description]
   */
  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const newBoard: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards = [...this.boards, newBoard];
    return newBoard;
  }

  getBoardById(id): Board {
    const found = this.boards.find((b) => b.id === id);

    // 특정 게시물이 없을 경우, nest의 예외 인스턴스 발생
    if (!found) {
      throw new NotFoundException(`Can't find Board With Id ${id}`);
    }
    return found;
  }

  deleteBoard(id): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((b) => b.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): void {
    const board = this.getBoardById(id);
    board.status = status;
  }
}
