import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { VerifyDto } from './dto/verify-user.dto';
import { ChangedPassword } from './dto/change-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly emailOtp: EmailService
  ) { }

  async register(createUserDto: CreateUserDto) {
    const { password, region_id, ...rest } = createUserDto;
    let email_one = await this.prisma.user.findFirst({ where: { email: rest.email } })
    if (email_one) {
      throw new BadRequestException("email already exits")
    }
    if (region_id) {
      let one = await this.prisma.region.findFirst({ where: { id: region_id } })
      if (!one) {
        throw new BadRequestException("Region not found")
      }
    }
    const existing = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        image: createUserDto.image || "",
        region_id: region_id,
        role: createUserDto.role,
      },
    });
    let otp = await this.emailOtp.sendOtp(rest.email)
    return {
      message: 'User registered successfully. OTP verified.',
      user: newUser,
    };
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    const token = await this.jwt.signAsync({
      id: user.id,
      role: user.role,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.create({
      data: {
        user_id: user.id,
        token,
        expiresAt,
      },
    });

    return {
      message: 'Login successful',
      token,
    };
  }


  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        Region: true,
        Comments: true,
        Views: true,
        Likes: true,
        Orders: true,
      },
    });
    return users;
  }

  async findOne(id: number) {

    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        Region: true,
        Comments: true,
        Views: true,
        Likes: true,
        Orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });

    return {
      message: 'User deleted successfully',
      user,
    };
  }
  async Verify(data: VerifyDto) {
    const isVerified = await this.emailOtp.verifyOtp(data.email, data.otp);

    if (isVerified) {
      return "Verify Successfully";
    } else {
      throw new Error("Invalid OTP");
    }
  }
  async changedPassword(ChangedPassword: ChangedPassword) {
    const user = await this.prisma.user.findFirst({ where: { email: ChangedPassword.email } });

    if (!user) {
      throw new BadRequestException("Email is invalid");
    }

    const match = await bcrypt.compare(ChangedPassword.password, user.password);
    if (!match) {
      throw new BadRequestException("Password is invalid");
    }

    const hashedPassword = await bcrypt.hash(ChangedPassword.new_password, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { message: "password changed", updatedUser };
  }

}
