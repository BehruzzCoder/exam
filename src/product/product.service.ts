import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Prisma } from '@prisma/client'; 

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, situation, count, sale, description, category_id } = createProductDto;

    if (category_id) {
      const category = await this.prisma.category.findUnique({ where: { id: category_id } });
      if (!category) {
        throw new BadRequestException("Category not found");
      }
    }
    let finalPrice = price;
    if (sale && sale > 0) {
      finalPrice = price - (price * (sale / 100));
    }

    return this.prisma.product.create({
      data: {
        name,
        price: finalPrice,
        situation,
        count,
        sale,
        description,
        category_id,
      },
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;

    const whereConditions: Prisma.ProductWhereInput = search
      ? {
        name: {
          contains: search,
          mode: 'insensitive',  
        },
      }
      : {};

    return this.prisma.product.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { Comments: true },
    });
  }

  async findOne(user_id: number, id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingView = await this.prisma.view.findUnique({
      where: {
        user_id_product_id: {
          user_id,
          product_id: id,
        },
      },
    });

    if (!existingView) {
      await this.prisma.view.create({
        data: {
          user_id,
          product_id: id,
        },
      });
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name, price, situation, count, sale, description, category_id } = updateProductDto;
    let one = await this.prisma.product.findFirst({ where: { id } })
    if (!one) {
      throw new BadRequestException("Product not found")
    }
    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        situation,
        count,
        sale,
        description,
        category_id,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    let one = await this.prisma.product.findFirst({ where: { id } })
    if (!one) {
      throw new BadRequestException("Product not found")
    }
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
