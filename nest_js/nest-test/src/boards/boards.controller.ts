import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseStatus } from 'src/common/dto/response.status';
import { ResponseEntity } from 'src/common/dto/test.response.dto';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create.board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';

@ApiTags('Boards')
@Controller('api/boards')
export class BoardsController {
  private readonly logger = new Logger('BOARDS');

  constructor(private boardsService: BoardsService) {}

  @ApiOkResponse({
    type: ResponseEntity<Board | string>,
  })
  @Get('/:id')
  async getBoard(
    @Param('id') id: number,
  ): Promise<ResponseEntity<Board | string>> {
    try {
      const board = await this.boardsService.getBoard(id);
      return ResponseEntity.OK_WITH(board);
    } catch (error) {
      this.logger.debug(error);

      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllBoards(): Promise<ResponseEntity<Board[]>> {
    return ResponseEntity.OK_WITH(await this.boardsService.getAllBoards());
  }

  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.boardsService.createBoard(createBoardDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(
        '게시물을 생성하지 못했습니다.',
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Patch('/:id')
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.boardsService.updateBoard(id, updateBoardDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: number): Promise<ResponseEntity<string>> {
    try {
      await this.boardsService.deleteBoard(id);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR();
    }
  }
}
