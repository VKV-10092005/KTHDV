import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request) {
    return {
      message: this.appService.getHello(),
      user: (req as any).user,
    };
  }
}