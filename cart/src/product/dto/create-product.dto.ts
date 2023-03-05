import { ShoppingCart } from '../../shopping-cart/entities/shopping-cart.entity';

export class CreateProductDto {
  productId: string;
  quantity: number;
  shoppingCart?: ShoppingCart;
}
