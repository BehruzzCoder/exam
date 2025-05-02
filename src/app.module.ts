import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailService } from './email/email.service';
import { ProductModule } from './product/product.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { EmailModule } from './email/email.module';
import { PassportModule } from '@nestjs/passport';
import { ChatModule } from './chat/chat.module';
import { MulterModule } from '@nestjs/platform-express';
import { MeModule } from './me/me.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [UserModule, PrismaModule, ProductModule, RegionModule, CategoryModule, LikeModule, OrderModule, CommentModule, EmailModule,PassportModule, ChatModule,MulterModule.register({
    dest: "./uploads"
  }), MeModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
