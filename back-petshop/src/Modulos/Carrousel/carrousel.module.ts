import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrousel } from 'src/Entities/Carrousel.entity';
import { CarrouselController } from './carrousel.controller';
import { CarrouselService } from './carrousel.service';
import { CloudinaryModule } from 'config/cloudinary/cloudinary.module';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrousel]),
    CloudinaryModule,
    AuthModule,
  ],
  controllers: [CarrouselController],
  providers: [CarrouselService],
  exports: [CarrouselService],
})
export class CarrouselModule {}
