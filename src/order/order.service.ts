import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { count } from 'console';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_id, createOrderDto: CreateOrderDto) {
    try {
      let newOrder = {
        count: createOrderDto.count,
        product_id: createOrderDto.product_id,
        user_id
      }
      let Order = await this.prisma.order.create({ data: newOrder })
      return Order
    } catch (error) {
      throw new Error('Create Order Error: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.order.findMany({
        include: {
          User: true,
          product: true,
        },
      });
    } catch (error) {
      throw new Error('Find All Orders Error: ' + error.message);
    }
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        User: true,
        product: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
      });
    } catch (error) {
      throw new Error('Update Order Error: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Delete Order Error: ' + error.message);
    }
  }
}
