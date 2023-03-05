import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveToCartDto } from './dto/remove-to-cart.dto';
import { ShoppingCartEntity } from './entities/shopping-cart.entity';
import { ShoppingCartService } from './shopping-cart.service';

@ApiTags('Shopping Cart')
@Controller('api/cart')
export class ShoppingCartController {
  constructor(private readonly shoppingService: ShoppingCartService) {}

  @Post()
  async create(@Body() data: AddToCartDto) {
    return await this.shoppingService.addToCart(data);
  }

  @Get()
  async findAll(): Promise<ShoppingCartEntity[]> {
    try {
      return await this.shoppingService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<ShoppingCartEntity> {
    try {
      return await this.shoppingService.findByUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':productId')
  async remove(
    @Param('productId') productId: string,
    @Headers('userId') userId: string,
  ) {
    const data: RemoveToCartDto = { userId, productId };
    try {
      return await this.shoppingService.removeToCart(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
