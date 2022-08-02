import { BoardStatus } from '../enum/board.status.enum';

export class UpdateBoardDto {
  content: string;
  status: BoardStatus;
}
