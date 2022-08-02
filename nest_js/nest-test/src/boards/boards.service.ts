import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create.board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';
import { BoardStatus } from './enum/board.status.enum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private baordRepository: Repository<Board>,
    private userService: UsersService,
  ) {}

  async getBoard(id: number): Promise<Board> {
    return await this.baordRepository.findOne({
      where: { id },
    });
  }

  async getAllBoards(): Promise<Board[]> {
    // return this.baordRepository.find({
    //   relations: {
    //     user: true,
    //   },
    // });
    const [boards, count] = await this.baordRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .getManyAndCount();
    Logger.log(`getAllBoards_count: ${count}`);
    return boards;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { content, status = BoardStatus.PUBLIC, userId } = createBoardDto;
    Logger.log('userId: ', userId);
    const foundUser = await this.userService.getUser(userId);
    const boardToCreate = {
      content,
      status,
      user: foundUser,
    };
    this.baordRepository.save(boardToCreate);
  }

  async updateBoard(id, updateBoardDto: UpdateBoardDto): Promise<void> {
    await this.baordRepository.update({ id }, updateBoardDto);
  }
  deleteBoard(id: number) {
    this.baordRepository.softDelete(id);
  }
}
