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
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('api/v1/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  async create(@Body() data: CreateShoppingCartDto) {
    try {
      return await this.shoppingCartService.addToCart(
        data.userId,
        data.productId,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.shoppingCartService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    try {
      return await this.shoppingCartService.findByUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('userId') userId: string) {
    try {
      return await this.shoppingCartService.removeToCart(id, userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
