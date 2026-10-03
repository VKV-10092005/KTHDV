import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException(
        'Vui lòng cung cấp JWT token',
      );
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization phải có dạng Bearer <token>',
      );
    }

    const token = authorization.substring(7);

    try {
      const payload = this.authService.verifyToken(token);

      (req as any).user = payload;

      next();
    } catch {
      throw new UnauthorizedException(
        'Token không hợp lệ hoặc đã hết hạn',
      );
    }
  }
}