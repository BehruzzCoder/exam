import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: Request, @Body() dto: CreateLikeDto) {
    const user = req.user as any;
    return this.likeService.create({
      ...dto,
      user_id: user.id,
    });
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { id: number, role: string }
    return this.likeService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('unlike')
  unlike(@Req() req: Request, @Body() dto: CreateLikeDto) {
    const user = req.user as any;
    return this.likeService.unlike(user.id, dto.product_id);
  }
}