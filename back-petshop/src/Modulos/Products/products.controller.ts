import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // UseGuards,
} from '@nestjs/common';

import { ProductService } from './products.service';
import { ProductDto, UpdateProductDto } from './product.Dto';
// import { JwtAuthGuard } from 'src/Modulos/Auth/Guard/JWT/jwt-auth.guards';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  viewAllProducts() {
    return this.productService.viewAllProducts();
  }

  @Get(':idProduct')
  viewProduct(@Param('idProduct') idProduct: string) {
    return this.productService.viewProduct(idProduct);
  }

  @Patch(':idProduct')
  updateProduct(
    @Param('idProduct') idProduct: string,
    @Body() updateData: UpdateProductDto,
  ) {
    return this.productService.editProduct(idProduct, updateData);
  }

  @Delete(':idProduct')
  deleteProduct(@Param('idProduct') idProduct: string) {
    return this.productService.deleteProduct(idProduct);
  }

  @Post()
  createProduct(@Body() productData: ProductDto) {
    return this.productService.addProduct(productData);
  }
}
