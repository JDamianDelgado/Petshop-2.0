import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carrito } from './Carrito.entity';
import { UserRole } from 'src/Modulos/Auth/Guard/roles.user';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  age: number;

  @OneToOne(() => Carrito, (carrito) => carrito.user)
  carrito: Carrito;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  rol: UserRole;
}
