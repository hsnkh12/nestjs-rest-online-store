import { Module } from '@nestjs/common';
import { NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { JwtMiddlewareService } from '../jwt/services/jwt_middleware.service';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products, ProductAttributes } from './models/products.entity';
import { Categories } from './models/categories.entity';
import { JwtAuthModule } from '../jwt/jwt.module';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';



@Module({
    imports: [TypeOrmModule.forFeature([Categories, Products, ProductAttributes]), JwtAuthModule],
    providers: [ProductsService, CategoriesService],
    controllers:[ProductsController, CategoriesController]
})
export class ProductsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddlewareService).forRoutes("products");
        consumer.apply(JwtMiddlewareService).forRoutes("categories");
      }
}
