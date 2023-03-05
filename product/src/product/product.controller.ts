import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseObjectIdPipe } from './pipes/parse-object-id.pipe';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: CreateProductDto) {
    try {
      return await this.productService.create(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    try {
      return await this.productService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.productService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
