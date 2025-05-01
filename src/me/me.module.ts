import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [MeController],
  providers: [MeService,JwtStrategy],
})
export class MeModule {}
