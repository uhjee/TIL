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
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseStatus } from 'src/common/dto/response.status';
import { ResponseEntity } from 'src/common/dto/test.response.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { GetUserDto } from './dto/get.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('api/users')
export class UsersController {
  private readonly logger = new Logger('USERS');

  constructor(private usersService: UsersService) {}

  @ApiOkResponse({
    type: ResponseEntity<GetUserDto | string>,
  })
  @Get('/:id')
  async getUser(
    @Param('id') id: number,
  ): Promise<ResponseEntity<User | string>> {
    try {
      const user = await this.usersService.getUser(id);
      return ResponseEntity.OK_WITH(user);
    } catch (error) {
      this.logger.debug(error);

      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllUsers(): Promise<ResponseEntity<User[]>> {
    return ResponseEntity.OK_WITH(await this.usersService.getAllUsers());
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.createUser(createUserDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(
        '유저를 생성하지 못했습니다.',
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.updateUser(id, updateUserDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.deleteUser(id);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR();
    }
  }
}
