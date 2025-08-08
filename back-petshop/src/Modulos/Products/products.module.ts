import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/Entities/Carrito.entity';
import { CartItems } from 'src/Entities/CartItems.entity';
import { Products } from 'src/Entities/Products.entity';
import { User } from 'src/Entities/User.entity';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, User, Carrito, CartItems])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
