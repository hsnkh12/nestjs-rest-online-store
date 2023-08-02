import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './modules/utils/utils.module';
import { JwtAuthModule } from './modules/jwt/jwt.module';


@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, 

  ConfigModule.forRoot({
    envFilePath: '.env',
  })
    , TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: process.env.DB_PASSWORD,
    database: 'online_store',
    autoLoadEntities: true,
    synchronize: true,
  }), UtilsModule, JwtAuthModule],  


  controllers: [],
})
export class AppModule {}
