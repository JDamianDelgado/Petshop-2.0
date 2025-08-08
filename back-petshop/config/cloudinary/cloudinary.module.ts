import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider],
  exports: [CloudinaryProvider],
})
export class CloudinaryModule {}
