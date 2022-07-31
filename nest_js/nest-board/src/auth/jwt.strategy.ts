import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
// DI 시스템에 등록해 필요한 곳에서 이 서비스를 주입해 사용할 수 있도록
export class JwtStrategy extends PassportStrategy(Strategy) {
  // @nestjs/passport 패키지의 PsspoartStrategy 클래스 상속
  // @passport-jwt 패키지에 정의된 Strategy 사용
  constructor(private userRepository: UserRepository) {
    // 상속받은 PassportStrategy의 옵션 처리 -중요
    super({
      // 인가할 때 사용할 Sercret Text
      secretOrKey: 'Secret1234',
      // Strategy 가 인가을 위해 토큰이 어디서 오는지 알려주도록 설정F
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
