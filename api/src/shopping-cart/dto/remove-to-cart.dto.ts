import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveToCartDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  productId: string;
}
