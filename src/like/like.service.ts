import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLikeDto) {
    const existing = await this.prisma.like.findUnique({
      where: {
        user_id_product_id: {
          user_id: dto.user_id,
          product_id: dto.product_id,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Siz bu productni allaqachon like qilgansiz');
    }

    return this.prisma.like.create({ data: dto });
  }

  async findAll() {
    return this.prisma.like.findMany({
      include: {
        user: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    const like = await this.prisma.like.findUnique({ where: { id } });
    if (!like) throw new NotFoundException('Like topilmadi');
    return like;
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.like.delete({ where: { id } });
  }

  async unlike(user_id: number, product_id: number) {
    const like = await this.prisma.like.findUnique({
      where: {
        user_id_product_id: { user_id, product_id },
      },
    });

    if (!like) throw new NotFoundException('Like mavjud emas');

    return this.prisma.like.delete({
      where: { user_id_product_id: { user_id, product_id } },
    });
  }
}