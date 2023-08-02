import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from "./services/jwt.service";


@Module({
    imports: [JwtModule.register({
        secret: 'my-secret-key', 
        signOptions: { expiresIn: '1h' }, 
      }),],
    providers: [JwtAuthService],
    exports: [JwtAuthService],
    
})
export class JwtAuthModule{}