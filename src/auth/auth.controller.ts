import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    body: {
      userName: string;
      password: string;
    },
  ) {
    return this.authService.login(
      body.userName,
      body.password,
    );
  }

  @Get()
  verifyToken(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException(
        'Thiếu Authorization header',
      );
    }

    const token = authorization.replace('Bearer ', '');

    return {
      message: 'Token hợp lệ',
      data: this.authService.verifyToken(token),
    };
  }
}