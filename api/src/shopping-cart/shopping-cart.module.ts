import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [HttpModule],
  providers: [ShoppingCartService, ProductService],
  exports: [ShoppingCartService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
