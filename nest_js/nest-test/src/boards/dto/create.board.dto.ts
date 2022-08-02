import { BoardStatus } from '../enum/board.status.enum';

export class CreateBoardDto {
  content: string;
  status: BoardStatus;
  userId: number;
}
