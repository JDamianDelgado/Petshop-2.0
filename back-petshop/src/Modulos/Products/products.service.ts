import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entities/Products.entity';
import { User } from 'src/Entities/User.entity';
import { Repository } from 'typeorm';
import { ProductDto, UpdateProductDto } from './product.Dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addProduct(productData: ProductDto) {
    const { name, description, price, imageUrl, stock } = productData;
    if (!name || !description || !price || !imageUrl || !stock) {
      throw new BadRequestException('Faltan datos de producto');
    }
    const newProduct = this.productRepository.create(productData);
    const saveProduct = await this.productRepository.save(newProduct);
    return {
      message: 'Producto creado con exito',
      product: saveProduct,
    };
  }

  //ADMIN FUNCTIONS
  async findProduct(idProduct: string) {
    const findById = await this.productRepository.findOne({
      where: { idProduct: idProduct },
    });
    if (!findById) throw new NotFoundException('No se encontro producto');
    return findById;
  }

  async deleteProduct(idProduct: string) {
    const productToDelete = await this.findProduct(idProduct);
    await this.productRepository.remove(productToDelete);

    return {
      message: 'Producto eliminado con éxito',
    };
  }

  async editProduct(idProduct: string, updateData: Partial<UpdateProductDto>) {
    const productToEdit = await this.findProduct(idProduct);
    Object.assign(productToEdit, updateData);
    const savedProduct = await this.productRepository.save(productToEdit);
    if (!savedProduct)
      throw new BadRequestException('No se pudo modificar el producto');
    return { message: 'Producto modificado', product: savedProduct };
  }

  async viewAllProducts() {
    const products = await this.productRepository.find();
    if (products.length <= 0) {
      return {
        message: 'No hay productos que mostrar ',
      };
    }
    return products;
  }

  async viewProduct(idProduct: string) {
    const product = await this.productRepository.findOne({
      where: { idProduct },
    });
    if (!product) throw new NotFoundException('No se encontro producto');
    if (product.stock <= 0) {
      return {
        message: 'Producto sin stock',
        product: product,
      };
    }
    return product;
  }
}
