import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    try {
      return await this.productService.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
