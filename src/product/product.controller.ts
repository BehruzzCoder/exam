import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role === "USER") {
      return this.productService.create(createProductDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit per page for pagination' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for filtering products by name' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field by which to sort' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Sort order (asc or desc)', enum: ['asc', 'desc'] })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
    @Req() req: Request
  ) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role === "USER") {
      return this.productService.findAll(page, limit, search, sortBy, sortOrder);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role === "USER") {
      return this.productService.findOne(user.id, +id);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'SUPERADMIN' || user.role === "ADMIN") {
      return this.productService.update(+id, updateProductDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN') {
      return this.productService.remove(+id);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }
}
