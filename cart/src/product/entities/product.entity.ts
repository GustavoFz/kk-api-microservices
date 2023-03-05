import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingCart } from '../../shopping-cart/entities/shopping-cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.products)
  shoppingCart: ShoppingCart;
}
