import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'shopping-cart' })
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  userId: string;

  @OneToMany(() => Product, (product) => product.shoppingCart)
  products?: Product[];
}
