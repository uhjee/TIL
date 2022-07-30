import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import CreateBoardDto from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  // 생성자 함수로 DI
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });

    // 특정 게시물이 없을 경우, nest의 예외 인스턴스 발생
    if (!found) {
      throw new NotFoundException(`Can't find Board With Id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    // 삭제된 데이터가 없는 경우 에러 던지기
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result: ', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    return await this.boardRepository.save(board);
  }
}
