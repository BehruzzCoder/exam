import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() CreateCommentDto: CreateCommentDto, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role == "USER") {
      return this.commentService.create(user.id,CreateCommentDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN') {
      return this.commentService.findAll();
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN') {
      return this.commentService.findOne(+id);
    } else {
      throw new UnauthorizedException("Access denied");
      
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN') {
      return this.commentService.update(+id, updateCommentDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
