import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { CartItems } from './CartItems.entity';

@Entity({ name: 'carrito' })
export class Carrito {
  @PrimaryGeneratedColumn('uuid')
  idCarrito: string;

  @OneToOne(() => User, (user) => user.carrito, { cascade: true })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @OneToMany(() => CartItems, (cartItem) => cartItem.carrito, {
    cascade: true,
  })
  cartItems: CartItems[];
}
