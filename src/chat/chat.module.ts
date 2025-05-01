import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [ChatController],
  providers: [ChatService,JwtStrategy],
})
export class ChatModule {}
