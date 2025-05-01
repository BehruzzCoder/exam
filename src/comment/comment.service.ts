import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_id: number, createCommentDto: CreateCommentDto) {
    try {
      let NewComment = {
        description: createCommentDto.description,
        star: createCommentDto.star,
        product_id: createCommentDto.star,
        user_id: user_id
      };
      let Comment = await this.prisma.comment.create({ data: NewComment });
      return Comment;
    } catch (error) {
      console.error('Create Comment Error:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.comment.findMany({
        include: {
          User: true,
          Product: true,
        },
      });
    } catch (error) {
      console.error('Find All Comments Error:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
        include: {
          User: true,
          Product: true,
        },
      });

      if (!comment) throw new NotFoundException('Comment not found');
      return comment;
    } catch (error) {
      console.error('Find One Comment Error:', error);
      throw error;
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      await this.findOne(id);
      return await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });
    } catch (error) {
      console.error('Update Comment Error:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Delete Comment Error:', error);
      throw error;
    }
  }
}
