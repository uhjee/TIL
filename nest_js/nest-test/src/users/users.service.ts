import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) throw new NotFoundException('이런 유저는 없어요');
    return found;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        deleteAt: null,
      },
    });
  }

  createUser(createUserDto: CreateUserDto): void {
    console.log('createUserDto: ', createUserDto);
    this.userRepository.save(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const found = await this.getUser(id);
    this.userRepository.update(found.id, updateUserDto);
  }

  deleteUser(id: number): void {
    this.userRepository.softDelete(id);
  }
}
