import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "secret"
  }),PassportModule],
  controllers: [UserController],
  providers: [UserService,EmailService,JwtStrategy],
})
export class UserModule { }
