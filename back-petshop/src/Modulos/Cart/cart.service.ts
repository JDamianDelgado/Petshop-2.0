import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/Entities/Carrito.entity';
import { CartItems } from 'src/Entities/CartItems.entity';
import { Products } from 'src/Entities/Products.entity';
import { User } from 'src/Entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartServices {
  constructor(
    @InjectRepository(Carrito)
    private readonly cartRepository: Repository<Carrito>,
    @InjectRepository(CartItems)
    private readonly cartItemsRepository: Repository<CartItems>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(idUser: string) {
    const user = await this.userRepository.findOne({
      where: { idUser },
      relations: ['carrito', 'carrito.cartItems', 'carrito.cartItems.product'],
    });
    if (!user) {
      throw new NotFoundException('No se encontro usuario');
    }
    return user;
  }
  async addProduct(
    idUser: string,
    idProduct: string,
    quantity: number,
  ): Promise<Carrito | null> {
    const user = await this.findUser(idUser);
    if (!user) {
      throw new BadRequestException('Hubo un problema');
    }
    const product = await this.productRepository.findOne({
      where: {
        idProduct,
      },
    });
    if (!product) {
      throw new NotFoundException('No se encontro producto');
    }
    if (product.stock <= 0) {
      throw new NotFoundException('Producto sin stock');
    }

    let carrito = user.carrito;
    if (!carrito) {
      carrito = this.cartRepository.create({
        user: user,
        cartItems: [],
      });
      carrito = await this.cartRepository.save(carrito);
    }

    let cartItem = carrito.cartItems.find(
      (item) => item.product.idProduct === idProduct,
    );

    if (cartItem) {
      cartItem.cantidad += quantity;
      product.stock -= quantity;
      cartItem.precio = cartItem.cantidad * cartItem.precio;
    } else {
      cartItem = this.cartItemsRepository.create({
        carrito,
        product,
        cantidad: quantity,
        precio: product.price * quantity,
      });
      product.stock -= quantity;
      carrito.cartItems.push(cartItem);
    }

    await this.cartItemsRepository.save(cartItem);

    const resultCart = await this.cartRepository.findOne({
      where: { idCarrito: carrito.idCarrito },
      relations: ['cartItems', 'cartItems.products'],
    });

    return resultCart;
  }

  async myCart(idUser: string): Promise<Carrito | string> {
    const user = await this.findUser(idUser);
    if (!user) {
      throw new BadRequestException('Hubo un problema');
    }

    if (!user || !user.carrito) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.carrito.cartItems.length <= 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...user.carrito,
        cartItems: [],
        menssage: 'El carrito está vacío',
      } as any;
    }
    return user.carrito;
  }

  async removeProduct(idUser: string, idProduct: string) {
    const user = await this.findUser(idUser);

    const productFind = user.carrito.cartItems.find(
      (item) => item.product.idProduct === idProduct,
    );

    if (!productFind) {
      throw new NotFoundException('Producto no encontrado en el carrito');
    }

    if (productFind.cantidad > 1) {
      productFind.cantidad -= 1;
      await this.cartItemsRepository.save(productFind);
    } else {
      await this.cartItemsRepository.remove(productFind);
    }

    return { message: 'Producto eliminado correctamente' };
  }

  async deleteCart(idUser: string) {
    const user = await this.findUser(idUser);

    const carrito = await this.cartRepository.findOne({
      where: { user: user.carrito.user },
      relations: ['cartItems'],
    });

    if (!carrito) {
      throw new NotFoundException('Carrito no encontrado');
    }

    if (carrito.cartItems.length === 0) {
      return { message: 'El carrito ya está vacío' };
    }

    for (const item of carrito.cartItems) {
      await this.cartItemsRepository.remove(item);
    }

    return { message: 'Carrito eliminado correctamente' };
  }
}
