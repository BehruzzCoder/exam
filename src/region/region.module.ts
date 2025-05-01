import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [RegionController],
  providers: [RegionService,JwtStrategy],
})
export class RegionModule {}
