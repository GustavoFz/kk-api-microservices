import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly URL_PRODUCT = process.env.IS_DOCKER
    ? process.env.URL_PRODUCT_DOCKER
    : process.env.URL_PRODUCT_LOCAL;
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ProductEntity[]> {
    const url = this.URL_PRODUCT;
    const response = await lastValueFrom(
      this.httpService.get<ProductEntity[]>(url),
    );

    if (response.status === HttpStatus.OK) {
      return response.data;
    }
    throw new NotFoundException('Products not found');
  }

  async findById(id: string): Promise<ProductEntity> {
    const url = `${this.URL_PRODUCT}/${id}`;

    const response = await lastValueFrom(
      this.httpService.get<ProductEntity>(url),
    );

    if (response.status === HttpStatus.OK) {
      return response.data;
    }
    throw new NotFoundException('Product not found');
  }

  async create(product: CreateProductDto): Promise<ProductEntity> {
    const url = this.URL_PRODUCT;
    const response = await lastValueFrom(
      this.httpService.post<ProductEntity>(url, product),
    );
    if (response.status === HttpStatus.CREATED) {
      return response.data;
    }
    throw new NotFoundException('Product not created');
  }
}
