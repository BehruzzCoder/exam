import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createRegionDto: CreateRegionDto) {
    let one = await this.prisma.region.findFirst({ where: { name: createRegionDto.name } })
    if(one){
      throw new BadRequestException("Region already exits")
    }
    let newRegion = await this.prisma.region.create({data: createRegionDto})
    return newRegion
  }

  findAll() {
    return this.prisma.region.findMany();
  }

  findOne(id: number) {
    let one = this.prisma.region.findUnique({
      where: { id },
      include: { users: true }
    });
    if (!one) {
      throw new NotFoundException("Region not found")
    }
    return one
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    let one = await this.prisma.region.findFirst({where: {id}})
    if(!one){
      throw new BadRequestException("Region not found")
    }
    return await  this.prisma.region.update({
      where: { id },
      data: {
        name: updateRegionDto.name,
      },
    });
  }

  async remove(id: number) {
    let one = this.prisma.region.findFirst({where: {id}})
    if(!one){
      throw new NotFoundException("Region not found")
    } 
    return this.prisma.region.delete({
      where: { id },
    });
  }
}
