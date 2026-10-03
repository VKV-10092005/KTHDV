import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly users = [
    {
      id: 1,
      userName: 'admin',
      password: '123456',
    },
    {
      id: 2,
      userName: 'student',
      password: '123456',
    },
  ];

  async login(userName: string, passwordBase64: string) {
    const password = Buffer.from(passwordBase64, 'base64').toString('utf8');

    const user = this.users.find(
      (item) =>
        item.userName === userName &&
        item.password === password,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Sai username hoặc password',
      );
    }

    const payload = {
      sub: user.id,
      userName: user.userName,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      user: {
        id: user.id,
        userName: user.userName,
      },
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}