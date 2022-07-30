import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  // 생성자 함수로 DI
  constructor(private userRepository: UserRepository) {}

  /**
   * 회원가입을 진행한다.
   * @param   {AuthCredentialsDto<void>}  authCredentialsDto  [authCredentialsDto description]
   * @return  {Promise<void>}                                 [return description]
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  /**
   * 로그인을 진행한다.
   * @param   {AuthCredentialsDto<string>}  authCredentialsDto  [authCredentialsDto description]
   * @return  {Promise<string>}                                 [return description]
   */
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    }
    throw new UnauthorizedException('login failed');
  }
}
