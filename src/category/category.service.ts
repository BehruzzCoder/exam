import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

async create(createCategoryDto: CreateCategoryDto) {
  try {
    const newCategory = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return newCategory;
  } catch (error) {
    throw new BadRequestException('Category already exists or invalid data');
  }
}


  async findAll() {
    return await this.prisma.category.findMany({include: {product: true}});
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      let one = await this.findOne(id); 
      if(!one){
        throw new NotFoundException("Category not found")
      }
      return await this.prisma.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update category');
    }
  }

  async remove(id: number) {
    await this.findOne(id); 
    return await this.prisma.category.delete({ where: { id } });
  }
}