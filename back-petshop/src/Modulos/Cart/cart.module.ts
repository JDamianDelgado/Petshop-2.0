import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/Entities/Carrito.entity';
import { CartController } from './cart.controller';
import { CartServices } from './cart.service';
import { User } from 'src/Entities/User.entity';
import { Products } from 'src/Entities/Products.entity';
import { CartItems } from 'src/Entities/CartItems.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, User, Products, CartItems])],
  controllers: [CartController],
  providers: [CartServices],
  exports: [CartServices],
})
export class CartModule {}
