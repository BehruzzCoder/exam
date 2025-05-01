import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [ProductController],
  providers: [ProductService,JwtStrategy],
})
export class ProductModule {}
