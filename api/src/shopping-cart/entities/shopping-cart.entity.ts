import { ProductEntity } from '../../product/entities/product.entity';

export class ShoppingCartEntity {
  id: string;
  userId: string;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  products: ProductEntity[];
}
