import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import CreateBoardDto from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    // 1. 객체 생성
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    // 2. insert
    await this.save(board);
    return board;
  }
}
