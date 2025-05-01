import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRegionDto: CreateRegionDto,@Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN') {
      return this.regionService.create(createRegionDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @Get()
  findAll() {
    return this.regionService.findAll();

  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.regionService.findOne(+id);
  }



  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto,  @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'SUPERADMIN' || user.role === "ADMIN") {
      return this.regionService.update(+id, updateRegionDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string,  @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN') {
      return this.regionService.remove(+id);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }
}