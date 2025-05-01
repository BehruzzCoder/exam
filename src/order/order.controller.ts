import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createOrderDto: CreateOrderDto ,@Req() req: Request, ) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role == "USER") {
      return this.orderService.create(user.id, createOrderDto);
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
      return this.orderService.findAll();
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
      return this.orderService.findOne(+id);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN' || user.role == "SUPERADMIN") {
      return this.orderService.update(+id, updateOrderDto);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: number, role: string };
    if (user.role === 'ADMIN') {
      return this.orderService.remove(+id);
    } else {
      throw new UnauthorizedException("Access denied");
    }
  }
}
