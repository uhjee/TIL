import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // * bcrypt 암호화 진행
    // 1. salt 생성
    const salt = await bcrypt.genSalt();
    // 2. password + salt로 해쉬 처리
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    // DB 예외처리
    try {
      await this.save(user);
    } catch (error) {
      // 중복 컬럼 존재할 경우
      if (error.code && error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username'); // 409 에러
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
