import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItems } from './CartItems.entity';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  idProduct: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  stock: number;

  @OneToMany(() => CartItems, (cartItem) => cartItem.product)
  cartItems?: CartItems[];
}
