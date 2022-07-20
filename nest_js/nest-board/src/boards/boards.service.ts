import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import CreateBoardDto from './dto/CreateBoard.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = Array.from(Array(10), (_, i) => ({
    id: uuid(),
    title: `title ${i}`,
    descript: `test ${i}`,
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
    const { title, descript } = createBoardDto;
    const newBoard: Board = {
      id: uuid(),
      title,
      descript,
      status: BoardStatus.PUBLIC,
    };
    this.boards = [...this.boards, newBoard];
    return newBoard;
  }

  getBoardById(id): Board {
    return this.boards.find((b) => b.id === id);
  }

  deleteBoard(id): void {
    if (!this.getBoardById(id)) throw new Error();
    this.boards = this.boards.filter((b) => b.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): void {
    const board = this.getBoardById(id);
    board.status = status;
  }
}
