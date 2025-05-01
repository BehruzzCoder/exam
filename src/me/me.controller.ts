import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMe(@Req() req: Request) {
    const user = req.user as { id: number };
    return this.meService.me(user.id);
  }
}
