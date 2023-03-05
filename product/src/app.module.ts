import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.IS_DOCKER
        ? process.env.MONGODB_URL_DOCKER
        : process.env.MONGODB_URL_LOCAL,
    ),
  ],
})
export class AppModule {}
