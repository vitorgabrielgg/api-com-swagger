import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(user: AuthDto): Promise<AuthResponseDto> {
    const userDb = await this.userService.findUserByEmail(user.email);

    if (!userDb || !bcrypt.compareSync(user.password, userDb.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: userDb.id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
