import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { URL } from 'url';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('uuid')
  'id': string;

  @Column()
  'name': string;

  @Column('decimal', { precision: 10, scale: 2 })
  'price': number;

  @Column()
  'image': string;
}
