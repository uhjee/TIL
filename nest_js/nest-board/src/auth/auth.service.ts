import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // 생성자 함수로 DI
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

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
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({
      username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성( secret + payload )
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload); // payload + secret
      return { accessToken };
    }
    throw new UnauthorizedException('login failed');
  }
}
