import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ProductService } from '../product/product.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveToCartDto } from './dto/remove-to-cart.dto';
import { ShoppingCartEntity } from './entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartService {
  private readonly URL_SHOPPING_CART = process.env.IS_DOCKER
    ? process.env.URL_SHOPPING_CART_DOCKER
    : process.env.URL_SHOPPING_CART_LOCAL;
  constructor(
    private readonly httpService: HttpService,
    private readonly productService: ProductService,
  ) {}

  async findAll(): Promise<ShoppingCartEntity[]> {
    const url = this.URL_SHOPPING_CART;

    const response = await lastValueFrom(
      this.httpService.get<ShoppingCartEntity[]>(url),
    );

    if (response.status === HttpStatus.OK) {
      const result = await this.getPricesNamesAndQuantities(response.data);

      return result;
    }
    throw new NotFoundException('Carts not found');
  }

  async findByUser(id): Promise<ShoppingCartEntity> {
    const url = `${this.URL_SHOPPING_CART}/${id}`;
    const response = await lastValueFrom(
      this.httpService.get<ShoppingCartEntity>(url),
    );

    if (response.status === HttpStatus.OK) {
      const result = await this.getPriceNameAndQuantity(response.data);

      return result;
    }
    throw new NotFoundException('Cart not found');
  }

  async addToCart(data: AddToCartDto): Promise<void> {
    const { userId, productId } = data;
    const url = this.URL_SHOPPING_CART;
    const response = await lastValueFrom(
      this.httpService.post<void>(url, { userId, productId }),
    );

    if (response.status === HttpStatus.CREATED) {
      return response.data;
    }
    throw new NotFoundException('Cart not found');
  }

  async removeToCart(data: RemoveToCartDto): Promise<void> {
    const { userId, productId } = data;
    const url = `${this.URL_SHOPPING_CART}/${productId}`;

    const response = await lastValueFrom(
      this.httpService.delete<void>(url, { headers: { userId } }),
    );

    if (response.status === HttpStatus.OK) {
      return response.data;
    }
    throw new NotFoundException('Cart not found');
  }

  async getPricesNamesAndQuantities(carts: ShoppingCartEntity[]) {
    for (let i = 0; i < carts.length; i += 1) {
      carts[i].totalPrice = 0;
      carts[i].totalQuantity = 0;
      for (let j = 0; j < carts[i].products.length; j += 1) {
        const product = await this.productService.findById(
          carts[i].products[j].productId,
        );

        carts[i].products[j].price = +product.price.toFixed(2);
        carts[i].totalPrice += +(
          product.price * carts[i].products[j].quantity
        ).toFixed(2);
        carts[i].totalQuantity += carts[i].products[j].quantity;
        carts[i].products[j].name = product.name;
      }
    }

    return carts;
  }

  async getPriceNameAndQuantity(
    cart: ShoppingCartEntity,
  ): Promise<ShoppingCartEntity> {
    cart.totalPrice = 0;
    cart.totalQuantity = 0;
    for (let i = 0; i < cart.products.length; i += 1) {
      const product = await this.productService.findById(
        cart.products[i].productId,
      );

      cart.products[i].price = +product.price.toFixed(2);
      cart.totalPrice += +(product.price * cart.products[i].quantity).toFixed(
        2,
      );
      cart.totalQuantity += cart.products[i].quantity;
      cart.products[i].name = product.name;
    }
    return cart;
  }
}
