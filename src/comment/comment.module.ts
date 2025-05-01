import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [CommentController],
  providers: [CommentService,JwtStrategy],
})
export class CommentModule {}
