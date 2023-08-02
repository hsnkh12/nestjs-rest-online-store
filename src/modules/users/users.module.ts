import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { Users } from './models/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';
import { JwtAuthModule } from '../jwt/jwt.module';
import { JwtMiddlewareService } from '../jwt/services/jwt_middleware.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), UtilsModule, JwtAuthModule],
    controllers: [AuthController, UsersController],
    providers: [AuthService, UsersService]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddlewareService).forRoutes('/users');
      }
}
