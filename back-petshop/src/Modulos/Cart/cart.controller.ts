import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
} from '@nestjs/common';
import { CartServices } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartServices: CartServices) {}

  @Post('addProduct')
  addProductCart(
    @Headers('user') idUser: string,
    @Body() body: { product: string; quantity: number },
  ) {
    const { product: idProduct, quantity } = body;
    if (typeof quantity !== 'number') {
      throw new BadRequestException('La cantidad debe ser un numero');
    }
    return this.cartServices.addProduct(idUser, idProduct, quantity);
  }

  @Delete('removeProduct')
  removeProduct(
    @Headers('user') idUser: string,
    @Body('product') idProduct: string,
  ) {
    return this.cartServices.removeProduct(idUser, idProduct);
  }

  @Delete('deleteCart')
  deleteCart(@Headers('user') idUser: string) {
    return this.cartServices.deleteCart(idUser);
  }

  @Get('myCart')
  myCart(@Headers('user') idUser: string) {
    return this.cartServices.myCart(idUser);
  }
}
