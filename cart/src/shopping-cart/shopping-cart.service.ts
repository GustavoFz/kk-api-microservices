import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    private readonly productService: ProductService,
  ) {}

  async findAll() {
    return await this.shoppingCartRepository.find({
      relations: ['products'],
    });
  }

  async findByUser(userId: string) {
    const cart = await this.shoppingCartRepository.findOne({
      where: { userId },
      relations: ['products'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async removeToCart(productId: string, userId: string) {
    const cart = await this.shoppingCartRepository.findOne({
      where: { userId },
      relations: ['products'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = cart.products.filter((p) => p.productId === productId);

    if (product.length < 1) {
      throw new NotFoundException('Product does not exist in the user is cart');
    }

    if (product[0].quantity == 1) {
      await this.productService.delete(product[0].id);
    }

    const quantity = product[0].quantity - 1;

    await this.productService.update(product[0].id, { quantity });
  }

  async addToCart(userId: string, productId: string) {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { userId },
      relations: ['products'],
    });

    if (!shoppingCart) {
      const product = await this.productService.create({
        productId,
        quantity: 1,
      });

      return await this.shoppingCartRepository.save({
        userId,
        products: [product],
      });
    }

    const cart = shoppingCart.products.filter((p) => p.productId === productId);

    if (cart.length < 1) {
      return await this.productService.create({
        productId,
        quantity: 1,
        shoppingCart: shoppingCart,
      });
    }

    const quantity = cart[0].quantity + 1;
    return await this.productService.update(cart[0].id, { quantity });
  }
}
