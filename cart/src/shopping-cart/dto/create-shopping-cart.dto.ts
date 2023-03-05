import { IsString } from 'class-validator';

export class CreateShoppingCartDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;
}
