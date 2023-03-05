import { Product } from '../../product/entities/product.entity';

export class FindShoppingCartDto {
  
  id: number;
  userId: number;
  products: Product[];
}
