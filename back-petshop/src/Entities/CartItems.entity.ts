import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carrito } from './Carrito.entity';
import { Products } from './Products.entity';

@Entity({ name: 'cart_items' })
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  idCartItem: string;

  @ManyToOne(() => Carrito, (carrito) => carrito.cartItems, {
    onDelete: 'CASCADE',
  })
  carrito: Carrito;

  @ManyToOne(() => Products, (product) => product.cartItems)
  product: Products;

  @Column()
  cantidad: number;

  @Column()
  precio: number;
}
