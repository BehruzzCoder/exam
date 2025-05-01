import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyDto } from './dto/verify-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { request, Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ChangedPassword } from './dto/change-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post("login")
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.userService.login(LoginUserDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get("")
  findAll(@Req() request: Request) {
    const user = request.user as { id: number, role: string };
    if (user.role === "ADMIN") {
      return this.userService.findAll();
    }else{
      throw new UnauthorizedException("Access denied")
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') @Req() request: Request, id: number) {
    const user = request.user as { id: number, role: string };
    if (user.role === "ADMIN") {
      return this.userService.findOne(id);
    }else{
      throw new UnauthorizedException("Access denied")
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') @Req() request: Request , id: number) {
    const user = request.user as { id: number, role: string };
    if (user.role === "ADMIN") {
      return this.userService.remove(id);
    }else{
      throw new UnauthorizedException("Access denied")
    }
  }
  @Post("verify")
  verify(@Body() VerifyDto: VerifyDto) {
    return this.userService.Verify(VerifyDto)
  }
  @Post("reset-password")
  change(@Body() ChangedPassword: ChangedPassword){
    return this.userService.changedPassword(ChangedPassword)
  }
}
