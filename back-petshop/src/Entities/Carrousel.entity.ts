import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'carrousel' })
export class Carrousel {
  @PrimaryGeneratedColumn('uuid')
  idCarrousel: string;

  @Column({ nullable: false })
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  publicId: string;

  @Column({ default: true })
  activo: boolean;
}
