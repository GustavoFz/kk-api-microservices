import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(data);
  }

  async findAll(): Promise<Array<Product>> {
    return await this.productRepository.find();
  }

  async findByProductId(productId: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { productId } });
  }

  async update(id: string, data: UpdateProductDto): Promise<any> {
    return await this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
