import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [LikeController],
  providers: [LikeService,JwtStrategy],
})
export class LikeModule {}
