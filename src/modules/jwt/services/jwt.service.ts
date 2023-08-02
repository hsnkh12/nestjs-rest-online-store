import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Users } from "src/modules/users/models/users.entity";

@Injectable()
export class JwtAuthService{

    constructor(private readonly jwtService: JwtService) {}

    async generateToken(user: Users): Promise<string> {
        const payload = { user_id: user.user_id, username: user.username, is_admin: user.is_admin}; 
        return this.jwtService.sign(payload);
    }
    
    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }

}