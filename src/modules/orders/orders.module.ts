import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtMiddlewareService } from '../jwt/services/jwt_middleware.service';
import { JwtAuthModule } from '../jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './models/orders.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';


@Module({
  imports: [JwtAuthModule, TypeOrmModule.forFeature([Orders])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddlewareService).forRoutes("orders/");
      }
}
