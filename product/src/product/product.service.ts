import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data: CreateProductDto) {
    const productExists = await this.productModel.findOne({ name: data.name });
    if (productExists) {
      throw new ConflictException('Product with that name already exists');
    }
    return await this.productModel.create(data);
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findById(id);
    return await this.productModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.findById(id);
    await this.productModel.findByIdAndRemove(id);
    return;
  }
}
