import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  items: string;

  @Column('int')
  quantity: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column('varchar', { length: 50 })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  deliveryFee: number;
}