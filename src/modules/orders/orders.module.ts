import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtMiddlewareService } from '../jwt/services/jwt_middleware.service';
import { JwtAuthModule } from '../jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './models/orders.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { Addresses } from './models/address.entity';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';


@Module({
  imports: [JwtAuthModule, TypeOrmModule.forFeature([Orders, Addresses])],
  providers: [OrdersService, AddressService],
  controllers: [OrdersController, AddressController]
})
export class OrdersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddlewareService).forRoutes("orders/");
        consumer.apply(JwtMiddlewareService).forRoutes("address/");
      }
}
